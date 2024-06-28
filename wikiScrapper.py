import requests, sys, webbrowser, bs4
import re
import string
search = input('Enter the topic :- ')
search = search.replace(' ','_')

try :
    res = requests.get(f'https://en.wikipedia.org/wiki/{search}')
    res.raise_for_status()
except:
    print("No such topic found")

# print('===========\n')
text = re.findall('<p>(.*)?[.]',res.text)
words = {}

for item in text:
    data = ''
    item = item + '.'
    index = 0
    while index < len(item):
        if item[index] != '<' and index < len(item) and item[index] != '&':
            if item[index] != '>' and item[index] != ';':
                data = data + item[index]
                index += 1
                continue
            index += 1

        if item[index] == '<' and index < len(item):
            try:
                index = item.index('>', index)
            except:
                index = len(item) - 1

        if item[index] == '&' and index < len(item):
            index = item.index(';', index)
            try:
                while item[index + 1].isdigit():
                   index = item.index(';', index + 1)
            except:
                index = item.index(';', index)

    for word in data.split():
        words[word] = words.get(word,0) + 1

    print("->", data)
    print()

print()
# print(words)
