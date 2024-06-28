from tkinter import *
import random

def next_turn(row, column):
    global player
    global players

    if buttons[row][column]['text'] == '' and check_winner() is None and empty_spaces() != 0:
        if player == players[0]:
            buttons[row][column]['text'] = player
            player = players[1]
            label.config(text=(players[1] + ' turn'))

        else:
            buttons[row][column]['text'] = player
            player = players[0]
            label.config(text=(players[0] + ' turn'))

    if check_winner() is None and empty_spaces() == 0:
        label.config(text='TIE!!!')

    if check_winner() == 'X':
        label.config(text = 'X WINS!!!')

    if check_winner() == 'O':
        label.config(text = 'O WINS!!!')

def check_winner():
    for r in range(3):
        if buttons[r][0]['text'] == buttons[r][1]['text'] == buttons[r][2]['text'] and buttons[r][0]['text'] != '':
            [buttons[r][i].config(bg = 'red') for i in range(3)]
            return buttons[r][0]['text']

    for c in range(3):
        if buttons[0][c]['text'] == buttons[1][c]['text'] == buttons[2][c]['text'] and buttons[0][c]['text'] != '':
            [buttons[i][c].config(bg='red') for i in range(3)]
            return buttons[0][c]['text']

    if buttons[0][0]['text'] == buttons[1][1]['text'] == buttons[2][2]['text'] and buttons[0][0]['text'] != '':
        [buttons[i][i].config(bg='red') for i in range(3)]
        return buttons[0][0]['text']

    if buttons[2][0]['text'] == buttons[1][1]['text'] == buttons[0][2]['text'] and buttons[0][2]['text'] != '':
        [buttons[2 - i][i].config(bg='red') for i in range(3)]
        return buttons[0][2]['text']

def empty_spaces():
    return len([buttons[row][column]['text'] for row in range(3) for column in range(3) if buttons[row][column]['text'] == ''])

def new_game():
    global player
    global player
    for i in range(3):
        for j in range(3):
            buttons[i][j]['text'] = ''
            buttons[i][j].config(bg = 'white')

    players = ['X', 'O']
    player = random.choice(players)
    label.config(text = (player + ' turn'))

window = Tk()
window.title('Tic Tac Toe')
players = ['X','O']
player = random.choice(players)

buttons = [[0,0,0],[0,0,0],[0,0,0]]

label = Label(window, text = player + ' turn', font = ('consolas',40 ))
label.pack(side = TOP)

reset_button = Button(window, text = 'Restart', font = ('Ink Free', 20), command = new_game)
reset_button.pack(side = TOP)

frame = Frame(window)
frame.pack()

for row in range(3):
    for column in range(3):
        buttons[row][column] = Button(frame, text = '', font = ('Ink Free', 40),
                                      width = 5,
                                      height = 2,
                                      bg = 'white',
                                      command = lambda Row = row, Column = column: next_turn(Row, Column))
        buttons[row][column].grid(row = row, column = column)

window.mainloop()
