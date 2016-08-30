
--Quique -plan vs achieved por comite por año
select sum(app_plan) , sum(app_ach) , LC_name  
from operation Inner join  LC on operation.LC_idLC = LC.idLC  
where operation.year = 2016 
group by LC.LC_name;


---Quique -plan vs achieved por comite por Q
select app_plan , app_ach , LC_name  , month
from operation Inner join  LC on operation.LC_idLC = LC.idLC  
where operation.year = 2016 


---Quique -plan vs achieved total/MC (la suma de todos) por año
select sum(app_plan) , sum(app_ach) , MC_name  
from operation Inner join  LC on operation.LC_idLC = LC.idLC Inner join MC on LC.MC_idMC = MC.idMC
where operation.year = 2016 
group by MC_name;


--Quique -plan vs achieved total/MC (la suma de todos) por Q
select sum(app_plan) , sum(app_ach) , MC_name  ,program_idprogram
from operation Inner join  LC on operation.LC_idLC = LC.idLC Inner join MC on LC.MC_idMC = MC.idMC
where operation.year = 2016 
group by MC_name ,program_idprogram;


--Alfredo -crecimiento relativo por comite por año ((este año - año pasado)/año pasado)
select sum(app_plan) , sum(app_ach) , LC_name
from operation Inner join  LC on operation.LC_idLC = LC.idLC
group by LC.LC_name, LC.year;



--logrado de LC por mes 
select app_ach , LC_name  , operation.year, operation.month
from operation Inner join  LC on operation.LC_idLC = LC.idLC  
where operation.year = 2016 and operation.month = 1;

--logrado de MC por mes 
select sum(app_ach) , MC_name 
from operation Inner join  LC on operation.LC_idLC = LC.idLC Inner join MC on LC.MC_idMC = MC.idMC
where operation.year = 2016 and operation.month = 1 
group by MC_name;


--logrado de LC por año
select app_ach , LC_name  , operation.year, operation.month
from operation Inner join  LC on operation.LC_idLC = LC.idLC  
where operation.year = 2016;

--logrado de MC por año 
select sum(app_ach) , MC_name 
from operation Inner join  LC on operation.LC_idLC = LC.idLC Inner join MC on LC.MC_idMC = MC.idMC
where operation.year = 2016 
group by MC_name;








select  A.X, B.Y
from 
	(select sum(app_ach) as X, LC_idLC 
		from operation
		where operation.LC_idLC = 207 and operation.year = 2016) as A
inner join
		(select sum(app_ach) as Y, LC_idLC 
		from operation
		where operation.LC_idLC = 207 and operation.year = 2016) as B
on
	(A.LC_idLC = B.LC_idLC );

