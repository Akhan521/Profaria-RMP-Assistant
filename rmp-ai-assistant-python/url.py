import re
import json
import os
from requests_html import HTMLSession
import sys
from bs4 import BeautifulSoup
import hashlib

def validate_review(review_data):
    """Validate if the review data follows the correct format."""
    if not isinstance(review_data, dict):
        return False
    required_keys = ["professor", "review", "subject", "stars"]
    if any(key not in review_data for key in required_keys):
        return False
    if not isinstance(review_data["professor"], str) or not review_data["professor"]:
        return False
    if not isinstance(review_data["review"], str) or not review_data["review"]:
        return False
    if not isinstance(review_data["subject"], str) or not re.match(r"^[A-Z]+\d+\w?$", review_data["subject"]):
        return False
    if not isinstance(review_data["stars"], (int, float)) or not (1.0 <= review_data["stars"] <= 5.0):
        return False
    return True

def remove_duplicates(json_list):
    # Convert the list of JSON objects to a set of JSON strings to remove duplicates
    json_str_list = [json.dumps(item, sort_keys=True) for item in json_list]
    unique_json_str_set = set(json_str_list)
    
    # Convert the set of JSON strings back to a list of dictionaries
    unique_json_list = [json.loads(json_str) for json_str in unique_json_str_set]
    
    return unique_json_list

def scrape_and_format_reviews(url):
    session = HTMLSession()
    response = session.get(url)
    response.html.render()

    soup = BeautifulSoup(response.html.html, 'html.parser')

    # Extract professor's name
    professor_name_div = soup.find('div', class_=re.compile(r'^NameTitle__Name'))
    professor_name = professor_name_div.get_text(strip=True) if professor_name_div else "Unknown"
    
    # Add space between first and last name if needed
    if professor_name.isalpha() and len(professor_name.split()) == 1:
        professor_name = re.sub(r'([a-z])([A-Z])', r'\1 \2', professor_name)

    # Find the <ul> tag with id="ratingsList"
    ratings_list = soup.find('ul', id='ratingsList')
    existing_ids = set([])

    if ratings_list:
        list_items = ratings_list.find_all('li')

        for item in list_items:
            review_data = {}
            for child in item.find_all(recursive=False):
                text = child.get_text(strip=True)

                # Skip if it's an advertisement
                if "Advertisement" not in text:
                    
                    # Extract subject and stars using general rules
                    subject_match = re.search(r"([A-Z]+\d+\w?)", text)
                    stars_match = re.search(r"Quality(\d\.\d)", text)
                    review_match = re.search(
                    r"Textbook:\s*(Yes|No|N/A)\s*(.*?)(?:Online Class:\s*(Yes|No|N/A)\s*(.*))?$",
                    text, re.DOTALL
                )

                if review_match:
                    # Capture review content and handle Online Class if present
                    review_content = review_match.group(2).strip()
                    online_class_content = review_match.group(4) if review_match.group(4) else ""
                    
                    review_content = review_content + " " + online_class_content
                    review_content = re.sub(r"Helpful\d*$", "", review_content).strip()

                    if subject_match and stars_match and review_content:
                        review_data["professor"] = professor_name
                        review_data["review"] = review_content
                        review_data["subject"] = subject_match.group(1)
                        review_data["stars"] = float(stars_match.group(1))

                        if validate_review(review_data):

                            # Check if review already exists
                            file_exists = os.path.isfile('reviews.json')
                            if not file_exists:
                                with open('reviews.json', 'w') as file:
                                    file.write('[]')

                            with open('reviews.json', 'r+') as file:    
                                existing_data = json.load(file)
                                # Update the file with the new reviews
                                file.seek(0)
                                json.dump(remove_duplicates(existing_data + [review_data]), file, indent=2)
        return True
    else:
        return False

# Example usage:
url = "https://www.ratemyprofessors.com/professor/2611626"  # Replace with the actual URL you want to scrape
if scrape_and_format_reviews(url):
    print("Success")
else:
    print("Failed")




if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python3 script.py <url>")
        sys.exit(1)
    
    url = sys.argv[1]  # Get the URL from the command line argument
    
    if scrape_and_format_reviews(url):
        print("Success")
    else:
        print("Failed")