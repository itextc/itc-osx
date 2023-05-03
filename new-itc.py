# import libraries
import subprocess as subp
import tkinter as tk
import customtkinter as ctk
import pyperclip as pc

# set up the window
itc = ctk.CTk()
itc.title('Islāmic Text Copier')
itc.geometry('1000x550+500+280')
itc.resizable(True, True)
itc.configure(fg_color='#1b1c27')
itc.iconbitmap('icon.icns')
itc.minsize(1000, 550)

itc.mainloop()