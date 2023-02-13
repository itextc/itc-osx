# Islāmic Text Copier
# Nāṣir ʿAṭif

# arabic font used is Segoe UI

import tkinter as tk
from PIL import ImageTk, Image
from tkinter import messagebox
from os import path
import subprocess
import requests as rq
from socket import create_connection
import webbrowser
from pyglet import font
import keyboard as kb
from ctypes import cdll
import pyperclip as pc
import turtle
import tkmacosx as tkm
import customtkinter as ctk

root = tk.Tk()
# init window
winW = 620  # width of the window
winH = 320  # height of the window


# def center_window(w=winW, h=winH):
#     # get screen width and height
#     ws = root.winfo_screenwidth()  # width of the screen
#     hs = root.winfo_screenheight()  # height of the screen
#     # calculate position x, y
#     x = (ws / 2) - (w / 2)
#     y = (hs / 2) - (h / 2)


# winX = (scrW / 2) - (winW / 2)
# winY = (scrH / 2) - (winH / 2)

bg = "#1b1c27"
hoverbg = "#393c4f"
htipbg = "#191a24"
regfont = "Markazi Text"

root.iconbitmap("resources/icon.ico")
root.attributes("-topmost", True)

root.title("Islāmic Text Copier")
root.configure(bg=bg)
root.resizable(0, 0)
root.geometry("1000x550+500+280")
# root.geometry('%dx%d+%d+%d' % (w, h, x, y))
root.resizable(width=False, height=False)
# root.geometry(f"{winW}x{winH}+{int(winX)}+{int(winY)}")

# the entire point of this program


def btn1():
    pc.copy("ﷺ")
    copyinf.config(text="Just copied: ﷺ")

# the hotkey code for this program is not functioning for mac at the momment
# kb.add_hotkey("ctrl + a", lambda: pc.copy("ﷺ"))
# kb.add_hotkey("cmd", lambda: copyinf.config(text="Just copied: ﷺ"))


def btn2():
    pc.copy("ﷻ")
    copyinf.config(text="Just copied: ﷻ")


# kb.add_hotkey("alt", lambda: pc.copy("ﷻ"))
# kb.add_hotkey("alt", lambda: copyinf.config(text="Just copied: ﷻ"))


def btn3():
    pc.copy("سبحانه و تعالى")
    copyinf.config(text="Just copied: سبحانه و تعالى")


# kb.add_hotkey("ctrl", lambda: pc.copy("سبحانه و تعالى"))
# kb.add_hotkey("ctrl", lambda: copyinf.config(text="Just copied: سبحانه و تعالى"))


def btn4():
    pc.copy("عز و جل")
    copyinf.config(text="Just copied: عز و جل")


# kb.add_hotkey("alt+4", lambda: pc.copy("عز و جل"))
# kb.add_hotkey("alt+4", lambda: copyinf.config(text="Just copied: عز و جل"))


def btn5():
    pc.copy("رضي الله عنه")
    copyinf.config(text="Just copied: رضي الله عنه")


# kb.add_hotkey("alt+5", lambda: pc.copy("رضي الله عنه"))
# kb.add_hotkey("alt+5", lambda: copyinf.config(text="Just copied: رضي الله عنه"))


def btn6():
    pc.copy("رضي الله عنها")
    copyinf.config(text="Just copied: رضي الله عنها")


# kb.add_hotkey("alt+6", lambda: pc.copy("رضي الله عنها"))
# kb.add_hotkey("alt+6", lambda: copyinf.config(text="Just copied: رضي الله عنها"))


def btn7():
    pc.copy("رحمه الله")
    copyinf.config(text="Just copied: رحمه الله")


# kb.add_hotkey("alt+7", lambda: pc.copy("رحمه الله"))
# kb.add_hotkey("alt+7", lambda: copyinf.config(text="Just copied: رحمه الله"))


def btn8():
    pc.copy("حفظه الله")
    copyinf.config(text="Just copied: حفظه الله")


# kb.add_hotkey("alt+8", lambda: pc.copy("حفظه الله"))
# kb.add_hotkey("alt+8", lambda: copyinf.config(text="Just copied: حفظه الله"))


def btn9():
    pc.copy("عليه السلام")
    copyinf.config(text="Just copied: عليه السلام")


# kb.add_hotkey("alt+9", lambda: pc.copy("عليه السلام"))
# kb.add_hotkey("alt+9", lambda: copyinf.config(text="Just copied: عليه السلام"))


def btn10():
    pc.copy("الحمد لله")
    copyinf.config(text="Just copied: الحمد لله")


# kb.add_hotkey("alt+0", lambda: pc.copy("الحمد لله"))
# kb.add_hotkey("alt+0", lambda: copyinf.config(text="Just copied: الحمد لله"))


def btn11():
    pc.copy("جزاك الله خيرا")
    copyinf.config(text="Just copied: جزاك الله خيرا")


# kb.add_hotkey("alt+-", lambda: pc.copy("جزاك الله خيرا"))
# kb.add_hotkey("alt+-", lambda: copyinf.config(text="Just copied: جزاك الله خيرا"))


def btn12():
    pc.copy("بارك الله فيك")
    copyinf.config(text="Just copied: بارك الله فيك")


# kb.add_hotkey("alt+=", lambda: pc.copy("بارك الله فيك"))
# kb.add_hotkey("alt+=", lambda: copyinf.config(text="Just copied: بارك الله فيك"))


def btn13():
    pc.copy("السلام عليكم")
    copyinf.config(text="Just copied: السلام عليكم")


# kb.add_hotkey("alt+[", lambda: pc.copy("بارك الله فيك"))
# kb.add_hotkey("alt+[", lambda: copyinf.config(text="Just copied: السلام عليكم"))

# other functions

def hoverh(event):
    docubtn["bg"] = hoverbg
    copyinf.config(text="View the documentation for Islāmic Text Copier.")

def hoverhl(event):
    docubtn["bg"] = docubtn_bg
    copyinf.config(text=copyinf_d)

def hmsg():
    startfile("ITC_Documentation.pdf", "open")
    root.wm_state("iconic")

homeurllink = "http://itc.nasiratif.net"

def homeurl(url):
    webbrowser.open_new_tab(homeurllink)

def hover9l(event):
    btn9["bg"] = bg

def hover1(event):
    btn1["bg"] = hoverbg
    copyinf.config(text="Sallá Allāhu ʿAlayhī wa as-Salam (May Allāh's praise & salutations be upon him) (ALT + 1)")

def hover1l(event):
    btn1["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover2(event):
    btn2["bg"] = hoverbg
    copyinf.config(text="Jalla Jalāluhu (Exalted is His Majesty) (ALT + 2)")

def hover2l(event):
    btn2["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover3(event):
    btn3["bg"] = hoverbg
    copyinf.config(text="Subḥānahu wa Taʾālá (Glorious and Exalted is He) (ALT + 3)")

def hover3l(event):
    btn3["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover4(event):
    btn4["bg"] = hoverbg
    copyinf.config(text="ʿAzza wa Jal (The Mighty and Majestic) (ALT + 4)")

def hover4l(event):
    btn4["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover5(event):
    btn5["bg"] = hoverbg
    copyinf.config(text="Raḍī Allāhu ʿAnhu (May Allāh be pleased with him) (ALT + 5)")

def hover5l(event):
    btn5["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover6(event):
    btn6["bg"] = hoverbg
    copyinf.config(text="Raḍī Allāhu ʿAnhā (May Allāh be pleased with her) (ALT + 6)")

def hover6l(event):
    btn6["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover7(event):
    btn7["bg"] = hoverbg
    copyinf.config(text="Raḥimahullāh (May Allah have mercy on him) (ALT + 7)")

def hover7l(event):
    btn7["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover8(event):
    btn8["bg"] = hoverbg
    copyinf.config(text="Ḥafiẓahullāh (May Allah preserve him) (ALT + 8)")

def hover8l(event):
    btn8["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover9(event):
    btn9["bg"] = hoverbg
    copyinf.config(text="ʿAlayhī as-Salām (Peace be upon him) (ALT + 9)")

def hover9l(event):
    btn9["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover10(event):
    btn10["bg"] = hoverbg
    copyinf.config(text="Alḥamdulillāh (All praises and thanks are due to Allāh) (ALT + 0)")

def hover10l(event):
    btn10["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover11(event):
    btn11["bg"] = hoverbg
    copyinf.config(text="Jazāk Allāhu Khairan (May Allāh give you good) (ALT + - (Dash Symbol) )")

def hover11l(event):
    btn11["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover12(event):
    btn12["bg"] = hoverbg
    copyinf.config(text="Bārik Allāhu Fīk (May Allāh bless you) (ALT + = (Equal Symbol) )")

def hover12l(event):
    btn12["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover13(event):
    btn13["bg"] = hoverbg
    copyinf.config(text="As Salāmu ‘Alaikum (Peace be upon you) (ALT + [ (Left Square Bracket Symbol) )")

def hover13l(event):
    btn13["bg"] = bg
    copyinf.config(text=copyinf_d)

def hover14(event):
    btn14["bg"] = hoverbg
    copyinf.config(text="ʾIn shāʾ Allāh (If Allāh wills) (ALT + ] (Right Square Bracket Symbol) )")

def hover14l(event):
    btn14["bg"] = bg
    copyinf.config(text=copyinf_d)

def hoverc(event):
    copyrighttxt["fg"] = "gray"
    copyinf.config(text="Go to the Islāmic Text Copier website.")

def hovercl(event):
    copyrighttxt["fg"] = "white"
    copyinf.config(text=copyinf_d)


# gui


copyinf_d = "Hover over a text to see it's meaning in English"
copyinf = tk.Label(text=copyinf_d, font=(regfont, 16), bg=bg, fg="white")
copyinf.pack(side="bottom", pady=7)

btn1_img = tk.PhotoImage(file="resources/1.png")
btn2_img = tk.PhotoImage(file="resources/2.png")
btn3_img = tk.PhotoImage(file="resources/3.png")
btn4_img = tk.PhotoImage(file="resources/4.png")
btn5_img = tk.PhotoImage(file="resources/5.png")
btn6_img = tk.PhotoImage(file="resources/6.png")
btn7_img = tk.PhotoImage(file="resources/7.png")
btn8_img = tk.PhotoImage(file="resources/8.png")
btn9_img = tk.PhotoImage(file="resources/9.png")
btn10_img = tk.PhotoImage(file="resources/10.png")
btn11_img = tk.PhotoImage(file="resources/11.png")
btn12_img = tk.PhotoImage(file="resources/12.png")
btn13_img = tk.PhotoImage(file="resources/13.png")

copyrighttxt = tk.Label(text="© Nāṣir ʿAṭif\nv2.3", bg=bg,
                        fg="white", font=(regfont, 15))
copyrighttxt.place(x=8, y=8)
copyrighttxt.bind("<Enter>", hoverc)
copyrighttxt.bind("<Leave>", hovercl)
copyrighttxt.bind("<Button-1>", lambda e: homeurl(homeurl))

htip = ctk.CTkButton(text="Documentation", command=hmsg,
                     font=(regfont, 15), master=root)
htip.place(relx=0.5, rely=0.12, anchor="center")
htip.bind("<Enter>", hoverh)
htip.bind("<Leave>", hoverhl)

btn1 = ctk.CTkButton(master=root)
btn1.place(relx=0.13, rely=0.24)
btn1.bind("<Enter>", hover1)
btn1.bind("<Leave>", hover1l)

btn2 = ctk.CTkButton(master=root)
btn2.place(relx=0.24, rely=0.26)
btn2.bind("<Enter>", hover2)
btn2.bind("<Leave>", hover2l)

btn3 = ctk.CTkButton(master=root)
btn3.place(relx=0.33, rely=0.29)
btn3.bind("<Enter>", hover3)
btn3.bind("<Leave>", hover3l)

btn4 = ctk.CTkButton(master=root)
btn4.place(relx=0.54, rely=0.28)
btn4.bind("<Enter>", hover4)
btn4.bind("<Leave>", hover4l)

btn5 = ctk.CTkButton(master=root)
btn5.place(relx=0.14, rely=0.45)
btn5.bind("<Enter>", hover6)
btn5.bind("<Leave>", hover6l)

btn7 = ctk.CTkButton(master=root)
btn7.place(relx=0.34, rely=0.45)
btn7.bind("<Enter>", hover7)
btn7.bind("<Leave>", hover7l)

btn8 = ctk.CTkButton(master=root)
btn8.place(relx=0.49, rely=0.45)
btn8.bind("<Enter>", hover8)
btn8.bind("<Leave>", hover8l)

btn9 = ctk.CTkButton(master=root)
btn9.place(relx=0.65, rely=0.46)
btn9.bind("<Enter>", hover9)
btn9.bind("<Leave>", hover9l)

btn10 = ctk.CTkButton(master=root)
btn10.place(relx=0.14, rely=0.62)
btn10.bind("<Enter>", hover10)
btn10.bind("<Leave>", hover10l)

btn11 = ctk.CTkButton(master=root)
btn11.place(relx=0.29, rely=0.62)
btn11.bind("<Enter>", hover11)
btn11.bind("<Leave>", hover11l)

btn12 = ctk.CTkButton(master=root)
btn12.place(relx=0.49, rely=0.62)
btn12.bind("<Enter>", hover12)
btn12.bind("<Leave>", hover12l)

btn13 = ctk.CTkButton(master=root)
btn13.place(relx=0.69, rely=0.63)
btn13.bind("<Enter>", hover13)
btn13.bind("<Leave>", hover13l)

# check if the system is connected to the internet before checking for updates
# otherwise itc would crash


def testnet():
    try:
        create_connection(("nasiratif.net", 443))
        return True
    except OSError:
        return False


isconnected = testnet()

# check for updates

# set current version of itc in this variable:
itcversion = 15

# if isconnected == True:
#     request = rq.get("http://nasiratif.net/dl/version.txt")
#     open("version.txt", "wb").write(request.content)

#     if os.path.isfile("version.txt"):
#         with open("version.txt", "r") as f:
#             fileversion = f.read().replace("\n", "").strip()
#     if float(fileversion) > float(itcversion):
#         updatemsg = messagebox.askquestion(
#             title="Update Available", message="Alḥamdulillāh, an update is available. Go to the home page to download it?")
#     if updatemsg == "yes":
#         webbrowser.open("http://nasiratif.net/islamic-text-copier/")
#     root.quit()

root.mainloop()
