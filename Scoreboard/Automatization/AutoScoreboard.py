
import requests
import json
import datetime
import MySQLdb
from Tkinter import *
import ttk

##
#
#
#global vars
names = {
'iGT': {"type" : "opportunity", "programme": 2,'db_id':1},
'oGT': {"type" : "person", "programme": 2,'db_id':2},
'iGC': {"type" : "opportunity", "programme": 1,'db_id':3},
'oGC': {"type" : "person", "programme": 1,'db_id':4},
}
programmes={1:'iGT',2:'oGT',3:'iGC',4:'oGC'}
committees={}
access_token =""
#global vars
def request():
	print 'aqui incia el metodo request'	
	country = 1589;
	r = requests.get("https://gis-api.aiesec.org/v2/applications/analyze.json", data={'number': 12524, 'type': 'issue', 'action': 'show'})
	print(r.status_code, r.reason)
	print 'aqui se termina el metodo request'

#lol
def save_database():
	print 'aqui se incia el metodo de guardado'
	print 'aqui se temina el metodo de guardado'

#metodo para conseguir las entidades locales 
def get_local_offices():
	headers = {'access_token': access_token}
	r = requests.get("https://gis-api.aiesec.org/v1/offices/1589.json", data=headers)
	#print r.text
	d = json.loads(r.text)
	now = datetime.datetime.now()
	for k in d['suboffices']:
		committees[k['id']]={'name':k['name']}
		#print(r.status_code, r.reason)
		print committees

#gets the day stats acording to the lc, program and type
def get_day_stats(pr):
	program = programmes[pr]
	now = datetime.datetime.now()
	url = "https://gis-api.aiesec.org/v2/applications/analyze.json"
	params = {
	"access_token" : access_token,
	#"start_date" : now.strftime('%y-%m-01'),
	#"end_date" : now.strftime('%y-%m-%d'),
	"start_date" : now.strftime('2016-09-01'),
	"end_date" : now.strftime('2016-09-27'),
	"basic[home_office_id]" : 1589,
	"basic[type]" : names[program]['type'],
	"programmes[]" : names[program]['programme']
	}
	q = requests.get(url, data=params)
	#print q.text
	anltcs = json.loads(q.text)
	an =  anltcs['analytics']['children']['buckets']
	for val in an:
		if val['key'] not in committees :
			committees[val['key']]= {}
		#
		committees[val['key']][program]={
		'app':val['total_approvals']['doc_count'],
		're':val['total_realized']['doc_count'],
		'com':val['total_completed']['doc_count']}
		insert(now.month-1 , now.year , val['key'] , pr , val['total_realized']['doc_count'] , val['total_approvals']['doc_count'] , 
			0,0,val['total_completed']['doc_count'])


#
def get_stats():
	get_local_offices()
	get_day_stats(1)
	get_day_stats(2)
	get_day_stats(3)
	get_day_stats(4)
	#print str(committees)

#"INSERT INTO operation (month,year,LC_idLC,program_idprogram,re_plan,app_plan) VALUES \n("+
#month+","+year+","+lcID+","+program+","+rePlan+","+appPlan+")\n"+
#"ON DUPLICATE KEY UPDATE re_plan = "+rePlan+", app_plan = "+appPlan+";\n\n";	
def insert(month,year,lc,program,re,app,apl,op,com):
	if (lc == 1589):
		return
	#
	db = MySQLdb.connect("67.192.246.142","root","A1ESECMX-hub2438_dbs","scoreboard")
	# prepare a cursor object using cursor() method
	cursor = db.cursor()
	# execute SQL query using execute() method.
	sql_a = "INSERT INTO operation (month,year,LC_idLC,program_idprogram,re_ach,app_ach) "
	sql_b=" VALUES ({},{},{},{},{},{}) ".format(8,year,lc,program,re,app)
	sql_c=" ON DUPLICATE KEY UPDATE re_ach = {}, app_ach =  {} ".format(re,app) 
	sql =  sql_a +sql_b+ sql_c
	print sql
	cursor.execute(sql)
	# Fetch a single row using fetchone() method.
	#data = cursor.fetchone()
	#print "Database version : %s " % data
	# disconnect from server
	db.commit()
	db.close()

#
def dbtest():
	db = MySQLdb.connect("67.192.246.142","root","A1ESECMX-hub2438_dbs","scoreboard")
	# prepare a cursor object using cursor() method
	cursor = db.cursor()
	# execute SQL query using execute() method.
	cursor.execute("SELECT VERSION()")
	# Fetch a single row using fetchone() method.
	data = cursor.fetchone()
	print "Database version : %s " % data
	# disconnect from server
	db.close()

#
def calculate(*args):
	try:
		access_token = feet.get()
		get_stats()
	except ValueError:
		pass
#

'''
root = Tk()
root.title("Introduce token")

mainframe = ttk.Frame(root, padding="3 3 12 12")
mainframe.grid(column=0, row=0, sticky=(N, W, E, S))
mainframe.columnconfigure(0, weight=1)
mainframe.rowconfigure(0, weight=1)

feet = StringVar()
meters = StringVar()

feet_entry = ttk.Entry(mainframe, width=7, textvariable=feet)
feet_entry.grid(column=2, row=1, sticky=(W, E))

ttk.Label(mainframe, textvariable=meters).grid(column=2, row=2, sticky=(W, E))
ttk.Button(mainframe, text="Aceptar", command=calculate).grid(column=3, row=3, sticky=W)

ttk.Label(mainframe, text="token").grid(column=1, row=1, sticky=W)

for child in mainframe.winfo_children(): child.grid_configure(padx=5, pady=5)

feet_entry.focus()
root.bind('<Return>', calculate)

root.mainloop()

#aqui empieza la ejecucion del codigo 
'''
print 'Iniciando ejecucion'
access_token = '28ed01c464c1aebe782c3293f6efb5d39ee057b4f957279d5b070c9675c0218d'
get_stats()

#@TODO cambiar por el token estatico



