from tkinter import *
import math


class ButtonMaker:
    def __init__(self, frame, text, command, font, row, column, w, h, bg):
        self.button = Button(frame, text=text, command=command, font=font, width=w, height=h, bg=bg)
        self.button.grid(row=row, column=column)


global exp
global exp_show
exp = ""
exp_show = ""


def is_real_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False


def num1():
    global exp, exp_show
    exp = exp + str(1)
    exp_show = exp_show + str(1)
    label.config(text=exp_show)


def num2():
    global exp, exp_show
    exp = exp + str(2)
    exp_show = exp_show + str(2)
    label.config(text=exp_show)


def num3():
    global exp, exp_show
    exp = exp + str(3)
    exp_show = exp_show + str(3)
    label.config(text=exp_show)


def num4():
    global exp, exp_show
    exp = exp + str(4)
    exp_show = exp_show + str(4)
    label.config(text=exp_show)


def num5():
    global exp, exp_show
    exp = exp + str(5)
    exp_show = exp_show + str(5)
    label.config(text=exp_show)


def num6():
    global exp, exp_show
    exp = exp + str(6)
    exp_show = exp_show + str(6)
    label.config(text=exp_show)


def num7():
    global exp, exp_show
    exp = exp + str(7)
    exp_show = exp_show + str(7)
    label.config(text=exp_show)


def num8():
    global exp, exp_show
    exp = exp + str(8)
    exp_show = exp_show + str(8)
    label.config(text=exp_show)


def num9():
    global exp, exp_show
    exp = exp + str(9)
    exp_show = exp_show + str(9)
    label.config(text=exp_show)


def num0():
    global exp, exp_show
    exp = exp + str(0)
    exp_show = exp_show + str(0)
    label.config(text=exp_show)


def div():
    global exp, exp_show
    exp_show = exp_show + '÷'
    exp = exp + '/'
    label.config(text=exp_show)


def mul():
    global exp, exp_show
    exp_show = exp_show + 'x'
    exp = exp + '*'
    label.config(text=exp_show)


def add():
    global exp, exp_show
    exp = exp + '+'
    exp_show = exp_show + '+'
    label.config(text=exp_show)


def sub():
    global exp, exp_show
    exp = exp + '-'
    exp_show = exp_show + '-'
    label.config(text=exp_show)


def open():
    global exp, exp_show
    exp = exp + '('
    exp_show = exp_show + '('
    label.config(text=exp_show)


def close():
    global exp, exp_show
    exp = exp + ')'
    exp_show = exp_show + ')'
    label.config(text=exp_show)


def erase():
    global exp, exp_show
    exp = ''
    exp_show = ''
    label.config(text=exp_show)


def e():
    global exp, exp_show
    exp_show = exp_show + 'e'
    exp = exp + str(round(math.e,2))
    label.config(text=exp_show)


def pi():
    global exp, exp_show
    exp_show = exp_show + 'π'
    exp = exp + str(round(math.pi, 2))
    label.config(text=exp_show)


def dot():
    global exp, exp_show
    exp = exp + '.'
    exp_show = exp_show + '.'
    label.config(text=exp_show)


def extract(s):
    n = 0
    i = 0
    for char in s:
        if is_real_number(char):
            n = i
            break
        i += 1

    return s[n:]


def extract_pos(z):
    t = -1
    pos = 0
    for i in range(len(z)):
        if ')' in z[-i-1]:
            t += 1
            pos = pos + len(z[-i-1]) + 1
        elif '(' in z[-i-1] :
            if t == 0:
                pos = pos + len(z[-i - 1]) + 1
                return pos - 1
            else:
                pos = pos + len(z[-i - 1]) + 1
                t -= 1
        else:
            pos = pos + len(z[-i - 1]) + 1


def fact():
    global exp, exp_show
    exp_show = exp_show + '!'
    list1 = exp.replace('+', ' ').replace('-', ' ').replace('*', ' ').replace('/', ' ').split(' ')
    if is_real_number(list1[-1]) :
        exp = exp[0 : -len(list1[-1])] + f'math.factorial(int({list1[-1]}))'
    else:
        if is_real_number(list1[-1][-1]) :
            exp = exp[0 : -len(extract(list1[-1]))] + f'math.factorial(int({extract(list1[-1])}))'
        else:
            pos = extract_pos(list1[:])
            exp = exp[0:-pos] + f'math.factorial(int({exp[-pos:]}))'
    label.config(text=exp_show)


def mod():
    global exp, exp_show
    exp = exp + '%'
    exp_show = exp_show + '%'
    label.config(text=exp_show)


def log():
    global exp, exp_show
    exp_show = exp_show + 'log('
    exp = exp + 'math.log10('
    label.config(text=exp_show)


def ln():
    global exp, exp_show
    exp_show = exp_show + 'ln('
    exp = exp + 'math.log('
    label.config(text=exp_show)


def pow():
    global exp, exp_show
    exp_show = exp_show + '^('
    list1 = exp.replace('+', ' ').replace('-', ' ').replace('*', ' ').replace('/', ' ').split(' ')
    if is_real_number(list1[-1]):
        exp = exp[0: -len(list1[-1])] + f'math.pow({list1[-1]},'
    else:
        if is_real_number(list1[-1][-1]):
            exp = exp[0: -len(extract(list1[-1]))] + f'math.pow({extract(list1[-1])},'
        else:
            pos = extract_pos(list1[:])
            exp = exp[0:-pos] + f'math.pow({exp[-pos:]},'
    label.config(text=exp_show)


def sqrt():
    global exp, exp_show
    exp_show = exp_show + '√('
    exp = exp + 'math.sqrt('
    label.config(text=exp_show)


def sin():
    global exp, exp_show
    exp_show = exp_show + 'sin(('
    exp = exp + 'math.sin(math.radians('
    label.config(text=exp_show)


def cos():
    global exp, exp_show
    exp_show = exp_show + 'cos(('
    exp = exp + 'math.cos(math.radians('
    label.config(text=exp_show)


def back():
    global exp, exp_show
    exp_show = exp_show[0:len(exp_show)-1]
    exp = exp[0:(len(exp)-1)]
    label.config(text=exp_show)


def evaluate():
    global exp, exp_show
    try:
       label.config(text=eval(exp))
    except:
        label.config(text='DIVISION BY ZERO')
        print(exp)


window = Tk()
window.config(height=300, width=300)
window.title("Modern Calculator")

label = Label(window, text=exp, font=('Comic Sans', 30), bg='#ff5300', width=26, height=2)
label.pack(side=TOP)

frame = Frame(window)
frame.pack()

width_w = 7
height_h = 1
bg = '#8a8a8a'
f_size = 20

button1 = ButtonMaker(frame, '1', num1, ('Comic Sans', f_size), 0, 0, width_w, height_h, bg)
button2 = ButtonMaker(frame, '2', num2, ('Comic Sans', f_size), 0, 1, width_w, height_h, bg)
button3 = ButtonMaker(frame, '3', num3, ('Comic Sans', f_size), 0, 2, width_w, height_h, bg)
button4 = ButtonMaker(frame, '4', num4, ('Comic Sans', f_size), 1, 0, width_w, height_h, bg)
button5 = ButtonMaker(frame, '5', num5, ('Comic Sans', f_size), 1, 1, width_w, height_h, bg)
button6 = ButtonMaker(frame, '6', num6, ('Comic Sans', f_size), 1, 2, width_w, height_h, bg)
button7 = ButtonMaker(frame, '7', num7, ('Comic Sans', f_size), 2, 0, width_w, height_h, bg)
button8 = ButtonMaker(frame, '8', num8, ('Comic Sans', f_size), 2, 1, width_w, height_h, bg)
button9 = ButtonMaker(frame, '9', num9, ('Comic Sans', f_size), 2, 2, width_w, height_h, bg)
button0 = ButtonMaker(frame, '0', num0, ('Comic Sans', f_size), 3, 1, width_w, height_h, bg)
button_equals = ButtonMaker(frame, '=', evaluate, ('Comic Sans', f_size), 0, 3, width_w, height_h, bg)
button_backspace = ButtonMaker(frame, '←', back, ('Comic Sans', f_size), 3, 2, width_w, height_h, bg)
button_plus = ButtonMaker(frame, '+', add, ('Comic Sans', f_size), 4, 3, width_w, height_h, bg)
button_minus = ButtonMaker(frame, '-', sub, ('Comic Sans', f_size), 1, 3, width_w, height_h, bg)
button_mul = ButtonMaker(frame, 'x', mul, ('Comic Sans', f_size), 2, 3, width_w, height_h, bg)
button_div = ButtonMaker(frame, '÷', div, ('Comic Sans', f_size), 3, 3, width_w, height_h, bg)
button_clear = ButtonMaker(frame, 'CE', erase, ('Comic Sans', f_size), 4, 2, width_w, height_h, bg)
button_e = ButtonMaker(frame, 'e', e, ('Comic Sans', f_size), 4, 1, width_w, height_h, bg)
button_pi = ButtonMaker(frame, 'π', pi,  ('Comic Sans', f_size), 4, 0, width_w, height_h, bg)
button_dot = ButtonMaker(frame, '.', dot, ('Comic Sans', f_size), 3, 0, width_w, height_h, bg)
button_open = ButtonMaker(frame, '(', open, ('Comic Sans', f_size), 5, 0, width_w, height_h, bg)
button_close = ButtonMaker(frame, ')', close, ('Comic Sans', f_size), 5, 1, width_w, height_h, bg)
button_fact = ButtonMaker(frame, 'n!', fact, ('Comic Sans', f_size), 5, 2, width_w, height_h, bg)
button_mod = ButtonMaker(frame, '%', mod, ('Comic Sans', f_size), 5, 3, width_w, height_h, bg)
button_log = ButtonMaker(frame, 'log', log, ('Comic Sans', f_size), 4, 4, width_w, height_h, bg)
button_ln = ButtonMaker(frame, 'ln', ln, ('Comic Sans', f_size), 5, 4, width_w, height_h, bg)
button_power = ButtonMaker(frame, 'a^b', pow, ('Comic Sans', f_size), 2, 4, width_w, height_h, bg)
button_sqrt = ButtonMaker(frame, '√x', sqrt, ('Comic Sans', f_size), 3, 4, width_w, height_h, bg)
button_sin = ButtonMaker(frame, 'sin', sin, ('Comic Sans', f_size), 0, 4, width_w, height_h, bg)
button_cos = ButtonMaker(frame, 'cos', cos, ('Comic Sans', f_size), 1, 4, width_w, height_h, bg)


window.mainloop()
