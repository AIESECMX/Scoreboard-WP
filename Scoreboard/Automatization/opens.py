import gis_token_generator
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
now = datetime.datetime.now()
#now = datetime.date(2016,10,3)
programmes={1:'iGT',2:'oGT',3:'iGC',4:'oGC'}
committees={}
access_token =""

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
def get_opens():
	
	
	url = "https://gis-api.aiesec.org/v2/people.json"
	start_date = now.strftime('%y-%m-01')
	end_date = now.strftime('%y-%m-%d')


	for key in committees:
		params = {
		"access_token" : access_token,
		"filters[registered][from]" : start_date,
		"filters[registered][to]" : end_date,
		"filters[home_committee]" : key,
		"only" : 'facets'
		}
		q = requests.get(url, data=params)
		print q.text
#		insert(now.month-1 , now.year , val['key'] , pr , val['total_realized']['doc_count'] , val['total_approvals']['doc_count'] , 
#			val['total_applications']['doc_count'],0,val['total_completed']['doc_count'])


#
def get_stats():
	get_local_offices()
	get_opens()


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
	sql_a = "INSERT INTO operation (month,year,LC_idLC,program_idprogram,re_ach,app_ach,com_ach,apl_ach) "
	sql_b=" VALUES ({},{},{},{},{},{},{},{}) ".format(month,year,lc,program,re,app,com,apl)
	sql_c=" ON DUPLICATE KEY UPDATE re_ach = {}, app_ach =  {} ,com_ach = {}, apl_ach = {}".format(re,app,com,apl) 
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

print 'Iniciando ejecucion'
token_generation = gis_token_generator.GISTokenGenerator("enrique.suarez@aiesec.net", "si no leo me aburro")
access_token=token_generation.generate_token()

#access_token = 'bed4eebab1f908ca3b2a75d19ea20edce7bc49da29d0eb8092ef16f20f40c68d'
get_stats()


