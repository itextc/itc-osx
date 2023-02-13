import tkinter as tk
# from PIL import ImageTk, Image
# import os
import subprocess as subp
# import requests as rq
# import socket as sk
import webbrowser as wb
# from pyglet import font
# import keyboard as kb
# import ctypes as cty
import pyperclip as pc
# import turtle
# import tkmacosx as tkm
import customtkinter as ctk

# set up the window
itc = ctk.CTk()
itc.title('Islāmic Text Copier')
itc.geometry('1000x550+500+280')
itc.resizable(width=False, height=False)
itc.configure(bg='#1b1c27', fg_color="#1b1c27")
itc.iconbitmap('resources/icon.icns')

bg = '#1b1c27'
hoverbg = '#393c4f'
txtcl = '#ffffff'

# set up button commands

# command to copy ﷺ
def btn1():
    pc.copy("ﷺ")

# command to copy ﷻ
def btn2():
    pc.copy("ﷻ")

# command to copy سبحانه و تعالى
def btn3():
    pc.copy("سبحانه و تعالى")

# command to copy
def btn4():
    pc.copy("")

# command to copy
def btn5():
    pc.copy("")

# command to copy
def btn6():
    pc.copy("")

# command to copy
def btn7():
    pc.copy("")

# command to copy
def btn8():
    pc.copy("")

# command to copy
def btn9():
    pc.copy("")

# command to copy
def btn10():
    pc.copy("")

# command to copy
def btn11():
    pc.copy("")

# command to copy
def btn12():
    pc.copy("")

# command to copy
def btn13():
    pc.copy("")

# command to copy
def btn14():
    pc.copy("")

# other button commands


# Hover commands
def btn1_enter(event):
    btn_1.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallá Allāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn1_leave(event):
    btn_1.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn2_enter(event):
    btn_2.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Jalla Jalāluhu (Exalted is His Majesty)")

def btn2_leave(event):
    btn_2.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn3_enter(event):
    btn_3.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Subḥānahu wa Taʾālá (Glorious and Exalted is He)")

def btn3_leave(event):
    btn_3.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn4_enter(event):
    btn_4.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="ʿAzza wa Jal (The Mighty and Majestic)")

def btn4_leave(event):
    btn_4.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn5_enter(event):
    btn_5.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallá Allāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn5_leave(event):
    btn_5.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn6_enter(event):
    btn_6.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallá Allāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn6_leave(event):
    btn_6.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn7_enter(event):
    btn_7.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallá Allāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn7_leave(event):
    btn_7.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn8_enter(event):
    btn_8.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallá Allāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn8_leave(event):
    btn_8.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn9_enter(event):
    btn_9.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallá Allāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn9_leave(event):
    btn_9.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn10_enter(event):
    btn_10.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallá Allāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn10_leave(event):
    btn_10.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn11_enter(event):
    btn_11.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn11_leave(event):
    btn_11.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn12_enter(event):
    btn_12.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn12_leave(event):
    btn_12.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")

def btn13_enter(event):
    btn_13.configure(bg_color=bg, fg_color=hoverbg, text_color=txtcl)
    copyinfo.configure(text="Sallāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him)")

def btn13_leave(event):
    btn_13.configure(bg_color=bg, fg_color=bg, text_color=txtcl)
    copyinfo.configure(text="Hover over the words to see what they mean")


# open the documentation

documentation = "ITC_Documentation.pdf"

def manual():
    # subp.Popen(["open", documentation], stdout=subp.PIPE, stderr=subp.PIPE)
    wb.open(documentation)
    itc.wm_state('iconic')


# open the home page for installation and inforamtion

homeurl = "https://itc.nasiratif.net"

def home():
    # subp.Popen(["open", homeurl], stdout=subp.PIPE, stderr=subp.PIPE)
    wb.open(homeurl)
    itc.wm_state('iconic')

# open the github page for the project and issues

githuburl = "https://github.com/nasiratif/ITC"

def github():
    # subp.Popen(["open", githuburl], stdout=subp.PIPE, stderr=subp.PIPE)
    wb.open(githuburl)
    itc.wm_state('iconic')


# gui

# Make the tile of the window visibe on the canvas
title = ctk.CTkLabel(text="Islāmic Text Copier", font=("Times New Roman", 50), bg_color=bg, fg_color=bg, anchor=tk.CENTER, master=itc, text_color=txtcl)
title.place(x=10, y=0, relwidth=1, relheight=0.12)
# Hover texts that will be shown when the mouse hovers over the button
# copyinfo_text = tk.StringVar(master=itc, value="Hover over the words to see what they mean")
copyinfo = ctk.CTkLabel(master = itc, text="Hover over the words to see what they mean", font=("Calibri", 20), fg_color=bg, bg_color=bg, text_color=txtcl)
copyinfo.place(relx=0.5, rely=0.95, anchor=tk.CENTER)

# make button dependencies

# I dont know whether I will use image or text, but I will set up both
btn1_image = tk.PhotoImage("resources/1.png")
btn2_image = tk.PhotoImage("resources/2.png")
btn3_image = tk.PhotoImage("resources/3.png")
btn4_image = tk.PhotoImage("resources/4.png")
btn5_image = tk.PhotoImage("resources/5.png")
btn6_image = tk.PhotoImage("resources/6.png")
btn7_image = tk.PhotoImage("resources/7.png")
btn8_image = tk.PhotoImage("resources/8.png")
btn9_image = tk.PhotoImage("resources/9.png")
btn10_image = tk.PhotoImage("resources/10.png")
btn11_image = tk.PhotoImage("resources/11.png")
btn12_image = tk.PhotoImage("resources/12.png")
btn13_image = tk.PhotoImage("resources/13.png")
btn14_image = tk.PhotoImage("resources/14.png")
btn15_image = tk.PhotoImage("resources/15.png")
btn16_image = tk.PhotoImage("resources/16.png")
btn17_image = tk.PhotoImage("resources/17.png")
btn18_image = tk.PhotoImage("resources/18.png")
btn19_image = tk.PhotoImage("resources/19.png")
btn20_image = tk.PhotoImage("resources/20.png")
btn21_image = tk.PhotoImage("resources/21.png")
btn22_image = tk.PhotoImage("resources/22.png")

btn1_text = tk.StringVar(master=itc, value="ﷺ")
btn2_text = tk.StringVar(master=itc, value="ﷻ")
btn3_text = tk.StringVar(master=itc, value="سُبْحَانَهُ وَ تَعَالَى")
btn4_text = tk.StringVar(master=itc, value="عَزَّ وَ جَلّ")
btn5_text = tk.StringVar(master=itc, value="ُرَضِيَ الله عَنْه")
btn6_text = tk.StringVar(master=itc, value="")
btn7_text = tk.StringVar(master=itc, value="")
btn8_text = tk.StringVar(master=itc, value="")
btn9_text = tk.StringVar(master=itc, value="")
btn10_text = tk.StringVar(master=itc, value="")
btn11_text = tk.StringVar(master=itc, value="")
btn12_text = tk.StringVar(master=itc, value="")
btn13_text = tk.StringVar(master=itc, value="")
btn14_text = tk.StringVar(master=itc, value="")
btn15_text = tk.StringVar(master=itc, value="")
btn16_text = tk.StringVar(master=itc, value="")
btn17_text = tk.StringVar(master=itc, value="")
btn18_text = tk.StringVar(master=itc, value="")
btn19_text = tk.StringVar(master=itc, value="")
btn20_text = tk.StringVar(master=itc, value="")
btn21_text = tk.StringVar(master=itc, value="")
btn22_text = tk.StringVar(master=itc, value="")

info_text = tk.StringVar(master=itc, value="Made by Muslims: \n Nāsir Ātif and \n 'Abdur-Rahmān Bilāl")

info = ctk.CTkLabel(master = itc, textvariable=info_text, font=("Calibri", 15), fg_color="#1b1c27", bg_color="#1b1c27", text_color=txtcl)
info.place(relx=0.0777, rely=.09, anchor=tk.CENTER)

# Buttons

btn_1 = ctk.CTkButton(master=itc, textvariable=btn1_text, command=btn1, font=("Calibri", 70), width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", text_color=txtcl)
btn_1.bind("<Enter>", btn1_enter)
btn_1.bind("<Leave>", btn1_leave)
btn_2 = ctk.CTkButton(master=itc, textvariable=btn2_text, command=btn2,  width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Arial", 80), anchor=tk.CENTER, text_color=txtcl)
btn_3 = ctk.CTkButton(master=itc, textvariable=btn3_text, command=btn3,  width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 35), anchor=tk.CENTER, text_color=txtcl)
btn_4 = ctk.CTkButton(master=itc, textvariable=btn4_text, command=btn4,  width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 35), text_color=txtcl)
btn_5 = ctk.CTkButton(master=itc, textvariable=btn5_text, command=btn5,  width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
btn_6 = ctk.CTkButton(master=itc, textvariable=btn6_text, command=btn6,  width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
btn_7 = ctk.CTkButton(master=itc, textvariable=btn7_text, command=btn7,  width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
btn_8 = ctk.CTkButton(master=itc, textvariable=btn8_text, command=btn8, width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
btn_9 = ctk.CTkButton(master=itc, textvariable=btn9_text, command=btn9,  width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
btn_10 = ctk.CTkButton(master=itc, textvariable=btn10_text, command=btn10, width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
btn_11 = ctk.CTkButton(master=itc, textvariable=btn11_text, command=btn11, width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
btn_12 = ctk.CTkButton(master=itc, textvariable=btn12_text, command=btn12, width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
btn_13 = ctk.CTkButton(master=itc, textvariable=btn13_text, command=btn13, width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
btn_14 = ctk.CTkButton(master=itc, textvariable=btn14_text, command=btn14, width=60, height=60, fg_color="#1b1c27", bg_color="#1b1c27", font=("Calibri", 70), text_color=txtcl)
# btn_15 = ctk.CTkButton(master=itc, textvariable=btn15_text, command=btn15)
# btn_16 = ctk.CTkButton(master=itc, textvariable=btn16_text, command=btn16)
# btn_17 = ctk.CTkButton(master=itc, textvariable=btn17_text, command=btn17)
# btn_18 = ctk.CTkButton(master=itc, textvariable=btn18_text, command=btn18)
# btn_19 = ctk.CTkButton(master=itc, textvariable=btn19_text, command=btn19)
# btn_20 = ctk.CTkButton(master=itc, textvariable=btn20_text, command=btn20)
# btn_21 = ctk.CTkButton(master=itc, textvariable=btn21_text, command=btn21)
# btn_22 = ctk.CTkButton(master=itc, textvariable=btn22_text, command=btn22)

# Set up the hover effect
btn_1.bind("<Enter>", btn1_enter)
btn_1.bind("<Leave>", btn1_leave)
btn_2.bind("<Enter>", btn2_enter)
btn_2.bind("<Leave>", btn2_leave)
btn_3.bind("<Enter>", btn3_enter)
btn_3.bind("<Leave>", btn3_leave)
btn_4.bind("<Enter>", btn4_enter)
btn_4.bind("<Leave>", btn4_leave)
# Grid/place the buttons
btn_1.place(relx=0.12, rely=.3, anchor=tk.CENTER)
btn_2.place(relx=0.32, rely=.28, anchor=tk.CENTER)
btn_3.place(relx=0.552, rely=.3, anchor=tk.CENTER)
btn_4.place(relx=0.813, rely=.3, anchor=tk.CENTER)

# btn_1.grid(row=15, column=0, padx=90, pady=150)
# btn_2.grid(row=15, column=1, padx=8, pady=8)
# btn_3.grid(row=15, column=2, padx=80, pady=140)
# btn_4.grid(row=15, column=3, padx=8, pady=8)
# btn_5.grid(row=16, column=0, padx=2, pady=2)






# run the window
itc.mainloop()
