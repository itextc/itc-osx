import tkinter as tk
import pyperclip as pc

class Islamic_Text_Copier(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.master = master
        self.master.title("Islāmic Text Copier")
        self.master.geometry("1000x550+500+280")
        self.master.resizable(width=True, height=True)
        self.master.configure(background="#1b1c27")
        self.master.iconbitmap("icon.icns")
        self.pack()

        # Create 15 buttons with different text labels and commands
        self.btn1_text = tk.StringVar()
        self.btn1_text.set("Button 1")
        self.btn1 = tk.Button(self, textvariable=self.btn1_text, command=self.btn1_command)
        self.btn1.pack(pady=(20,0))

        self.btn2_text = tk.StringVar()
        self.btn2_text.set("Button 2")
        self.btn2 = tk.Button(self, textvariable=self.btn2_text, command=self.btn2_command)
        self.btn2.pack(pady=(20,0))

        self.btn3_text = tk.StringVar()
        self.btn3_text.set("Button 3")
        self.btn3 = tk.Button(self, textvariable=self.btn3_text, command=self.btn3_command)
        self.btn3.pack(pady=(20,0))

        self.btn4_text = tk.StringVar()
        self.btn4_text.set("Button 4")
        self.btn4 = tk.Button(self, textvariable=self.btn4_text, command=self.btn4_command)
        self.btn4.pack(pady=(20,0))

        self.btn5_text = tk.StringVar()
        self.btn5_text.set("Button 5")
        self.btn5 = tk.Button(self, textvariable=self.btn5_text, command=self.btn5_command)
        self.btn5.pack(pady=(20,0))

        self.btn6_text = tk.StringVar()
        self.btn6_text.set("Button 6")
        self.btn6 = tk.Button(self, textvariable=self.btn6_text, command=self.btn6_command)
        self.btn6.pack(pady=(20,0))

        self.btn7_text = tk.StringVar()
        self.btn7_text.set("Button 7")
        self.btn7 = tk.Button(self, textvariable=self.btn7_text, command=self.btn7_command)
        self.btn7.pack(pady=(20,0))

        self.btn8_text = tk.StringVar()
        self.btn8_text.set("Button 8")
        self.btn8 = tk.Button(self, textvariable=self.btn8_text, command=self.btn8_command)
        self.btn8.pack(pady=(20,0))

        self.btn9_text = tk.StringVar()
        self.btn9_text.set("Button 9")
        self.btn9 = tk.Button(self, textvariable=self.btn9_text, command=self.btn9_command)
        self.btn9.pack(pady=(20,0))

        self.btn10_text = tk.StringVar()
        self.btn10_text.set("Button 10")
        self.btn10 = tk.Button(self, textvariable=self.btn10_text, command=self.btn10_command)
        self.btn10.pack(pady=(20,0))

        self.btn11_text = tk.StringVar()
        self.btn11_text.set("Button 11")
        self.btn11 = tk.Button(self, textvariable=self.btn11_text, command=self.btn11_command)
        self.btn11.pack(pady=(20,0))

        self.btn12_text = tk.StringVar()
        self.btn12_text.set("Button 12")
        self.btn12 = tk.Button(self, textvariable=self.btn12_text, command=self.btn12_command)
        self.btn12.pack(pady=(20,0))

        self.btn13_text = tk.StringVar()
        self.btn13_text.set("Button 13")
        self.btn13 = tk.Button(self, textvariable=self.btn13_text, command=self.btn13_command)
        self.btn13.pack(pady=(20,0))

        self.btn14_text = tk.StringVar()
        self.btn14_text.set("Button 14")
        self.btn14 = tk.Button(self, textvariable=self.btn14_text, command=self.btn14_command)
        self.btn14.pack(pady=(20,0))

        self.btn15_text = tk.StringVar()
        self.btn15_text.set("Button 15")
        self.btn15 = tk.Button(self, textvariable=self.btn15_text, command=self.btn15_command)
        self.btn15.pack(pady=(20,0))

    # Define the command functions for each button
    def btn1_command(self):
        pc.copy(self.btn1_text.get())

    def btn2_command(self):
        pc.copy(self.btn2_text.get())

    def btn3_command(self):
        pc.copy(self.btn3_text.get())

    def btn4_command(self):
        pc.copy(self.btn4_text.get())

    def btn5_command(self):
        pc.copy(self.btn5_text.get())

    def btn6_command(self):
        pc.copy(self.btn6_text.get())

    def btn7_command(self):
        pc.copy(self.btn7_text.get())

    def btn8_command(self):
        pc.copy(self.btn8_text.get())

    def btn9_command(self):
        pc.copy(self.btn9_text.get())

    def btn10_command(self):
        pc.copy(self.btn10_text.get())

    def btn11_command(self):
        pc.copy(self.btn11_text.get())

    def btn12_command(self):
        pc.copy(self.btn12_text.get())

    def btn13_command(self):
        pc.copy(self.btn13_text.get())

    def btn14_command(self):
        pc.copy(self.btn14_text.get())

    def btn15_command(self):
        pc.copy(self.btn15_text.get())

# Create a tkinter instance and run the application
itc = tk.Tk()
itc_app = Islamic_Text_Copier(master=itc)
itc_app.mainloop()