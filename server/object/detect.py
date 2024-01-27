





import os

# Specify the path to the images folder
folder_path = "./laptop/laptop/images"

# List to store filenames without the ".jpg" extension
file_names = []

# Loop through all files in the folder
for filename in os.listdir(folder_path):
    # Check if the file is a .jpg file
    if filename.endswith(".jpg"):
        # Append the filename without the extension to the list
        file_names.append(os.path.splitext(filename)[0])

# Print or use the list of filenames
# print(file_names)

import csv

# Path to the annotations.csv file
csv_file_path = "./laptop/laptop/filtered_annotations.csv"

# List to store filtered annotations
filtered_annotations = []

# Loop through the annotations.csv file
with open(csv_file_path, newline='') as csvfile:
    reader = csv.reader(csvfile)
    header = next(reader)  # Skip the header row if it exists
    
    for row in reader:
        # Assuming the filename is in the first column (adjust if necessary)
        filename = os.path.splitext(row[0])[0]
        
        # Check if the filename without the extension is in file_names
        if filename in file_names:
            filtered_annotations.append(row)

# Write filtered annotations to a new txt file
output_txt_path = "filtered_annotations.txt"
with open(output_txt_path, 'w') as output_file:
    for annotation in filtered_annotations:
        output_file.write(','.join(annotation) + '\n')

print(f"Filtered annotations saved to {output_txt_path}")