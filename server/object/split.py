import csv

csv_file_path = "./laptop/laptop/filtered_annotations.csv"
output_file_path = "./laptop/laptop/filtered_annotations.csv"

with open(csv_file_path, 'r', newline='') as input_file, open(output_file_path, 'w', newline='') as output_file:
    reader = csv.reader(input_file)
    writer = csv.writer(output_file)


    # Skip every other row
    for index, row in enumerate(reader):
        if index % 2 == 0:
            writer.writerow(row)
