import tkinter as tk
import webbrowser
import os
from tkmacosx import Button
import requests
import tkinter.messagebox as messagebox

# Create the main window
root = tk.Tk()
root.title('Islāmic Text Copier')
root.geometry('1000x550+500+280')
root.resizable(width=True, height=True)
root.config(bg='#1b1c27')
itc_img = tk.Image("photo", file="main.png")
root.tk.call('wm', 'iconphoto', root._w, itc_img)

# Create a list of Arabic phrases
arabic_phrases = []

# Create a function to copy the selected Arabic phrase to clipboard
def copy_to_clipboard(phrase):
    root.clipboard_clear()
    root.clipboard_append(phrase)

# Create the buttons dynamically
buttons = []
for i, phrase in enumerate(arabic_phrases):
    button = Button(root, text=phrase, font=('Calibri', 30), width=140, bg='#1b1c27', fg='#ffffff', activebackground='#393c4f', activeforeground='#898DA9', command=lambda phrase=phrase: copy_to_clipboard(phrase), borderless=1)
    button.place(relx=[0.12, 0.32, 0.552, 0.813][i%4], rely=[0.2, 0.38, 0.58, 0.78][i//4], anchor=tk.CENTER)
    buttons.append(button)

# Create the documentation button
def open_documentation():
    os.system('open ITC_Documentation.pdf')

doc_button = Button(root, text='Documentation', font=('Calibri', 14), width=140, height=35, bg='#1b1c27', fg='#ffffff', activebackground='#393c4f', activeforeground='#898DA9', command=open_documentation, borderless=1)
doc_button.place(relx=0.02, rely=0.02, anchor=tk.NW)

# Create the made by button
def open_website():
    webbrowser.open('https://github.com/itextc/itc-osx')

made_by_button = Button(root, text='Made by \nAbdur-Rahman Bilal', font=('Calibri', 14), width=150, bg='#1b1c27', fg='#ffffff', activebackground='#393c4f', activeforeground='#898DA9', command=open_website, borderless=1)
made_by_button.place(relx=0.98, rely=0.02, anchor=tk.NE)

# Create the check for updates button
def check_for_updates():
    with open('version.txt', 'r') as f:
        local_version = f.read().strip()
    response = requests.get('https://raw.githubusercontent.com/itextc/itc-osx/main/version.txt')
    remote_version = response.text.strip()
    if local_version != remote_version:
        message = 'A new version of Islāmic Text Copier is available. Please download the latest version from the GitHub repository.'
        answer = messagebox.askyesno('Update Available', message + '\n\nDo you want to visit the GitHub repository to download the latest version?')
        if answer:
            webbrowser.open('https://github.com/itextc/itc-osx/releases')
    else:
        messagebox.showinfo('Up to Date', 'You are using the latest version of Islāmic Text Copier.')



update_button = Button(root, text='Check for updates', font=('Calibri', 14), width=140, bg='#1b1c27', fg='#ffffff', activebackground='#393c4f', activeforeground='#898DA9', command=check_for_updates, highlightbackground='#1b1c27', borderless=1)
update_button.place(relx=0.98, rely=0.98, anchor=tk.SE)

root.mainloop()