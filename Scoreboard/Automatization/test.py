
from Tkinter import *
import ttk

def calculate(*args):
	try:
		value = feet.get()
		meters.set(value )
	except ValueError:
		pass
#
def show_window():
	root = Tk()
	root.title("Introduce token")

	mainframe = ttk.Frame(root, padding="3 3 12 12")
	mainframe.grid(column=0, row=0, sticky=(N, W, E, S))
	mainframe.columnconfigure(0, weight=1)
	mainframe.rowconfigure(0, weight=1)



	feet_entry = ttk.Entry(mainframe, width=7, textvariable=feet)
	feet_entry.grid(column=2, row=1, sticky=(W, E))

	ttk.Label(mainframe, textvariable=meters).grid(column=2, row=2, sticky=(W, E))
	ttk.Button(mainframe, text="Aceptar", command=calculate).grid(column=3, row=3, sticky=W)

	ttk.Label(mainframe, text="token").grid(column=1, row=1, sticky=W)

	for child in mainframe.winfo_children(): child.grid_configure(padx=5, pady=5)

	feet_entry.focus()
	root.bind('<Return>', calculate)

	root.mainloop()

#
show_window()