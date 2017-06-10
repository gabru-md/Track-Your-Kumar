import pymongo
from pymongo import MongoClient

def menu():
	print("--- Welcome to NSIT's Students database ---")
	print('\nChoose from the following options:')
	print('1. View all records')
	print('2. View single record')
	print('3. Delete single record')
	print('4. Insert new record')
	print('5. Update record')
	print('6. Exit')

def show_all(table):
	cursor = table.find({})
	for document in cursor:
		print(document)

def show_one(table):
	roll = input("Enter roll no.: ")
	cursor = table.find({'Roll_no' : roll})
	for document in cursor:
		print(document)

def del_one(table):
	roll = input("Enter roll no.: ")
	table.delete_many({'Roll_no' : roll})
	print(roll, 'has been deleted.')

def ins_one(table):
	student = {'Roll_no' : input("Enter roll no.: "), 'Name' : input("Enter name: ")}
	try :
		table.insert_one(student)
		print('New student has been added.')
	except pymongo.errors.DuplicateKeyError:
		print("\nOh, snap! That roll no already exists.\n\n")

def update(table):
	roll = input("Enter roll no.: ")
	name = input("Enter new name: ")
	table.update_one({'Roll_no' : roll}, {'$set': {'Name' : name}})
	print(roll, 'has been updated')

client = MongoClient()
db = client['nsit']
table = db.students

table.create_index([("Roll_no", pymongo.ASCENDING)], unique = True)

menu()

choice = int(input())

while(choice != 6):
	if(choice == 1):
		show_all(table)
		menu()
		choice = int(input())
	elif(choice == 2):
		show_one(table)
		menu()
		choice = int(input())
	elif(choice == 3):
		del_one(table)
		menu()
		choice = int(input())
	elif(choice == 4):
		ins_one(table)
		menu()
		choice = int(input())
	elif(choice == 5):
		update(table)
		menu()
		choice = int(input())

print("\n\nThank you for using NSIT's Students database")

input()