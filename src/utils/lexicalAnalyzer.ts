export type Triple = {
  token: string;
  lexem: string;
  id: number;
}

const spaceRegex = /\s/g;
const letterRegex = /[A-z]/g;
const letterAndNumberRegex = /[A-z]|[1-9]/g;
const numberRegex = /[0-9]/g;
const specialCharacterRegex = /[()+\-\*<>=:/]/g;

export function analyze(str: string): Triple[] | null {
  let triples: Triple[] = [];
  for (let i = 0; i < str.length; i++) {
    if (!str.charAt(i).match(spaceRegex)) {
      if (str.charAt(i).match(letterRegex)) {
        const result = getVariable(i, str);
        if (result) {
          const [triple, pos] = result;
          i = pos;
          triples.push(triple);
        } else {
          console.log('should return null')
          return null;
        }
      }
      if (str.charAt(i).match(numberRegex)) {
        const result = getNumber(i, str);
        if (result) {
          const [triple, pos] = result
          i = pos;
          triples.push(triple);
        } else {
          return null;
        }
      }
      if (str.charAt(i).match(specialCharacterRegex)) {
        const result = getSpecialCharacter(i, str);
        if (result) {
          const [triple, pos] = result;
          i = pos;
          triples.push(triple);
        } else {
          return null;
        }
      }
    }
  }
  return triples;
}

function getVariable(pos: number, str: string) {
  let subString = str.charAt(pos);
  if (str.charAt(pos + 1).match(letterRegex)) {
    subString = str.slice(pos, pos + 2)
    if (str.charAt(pos + 2).match(letterAndNumberRegex)) {
      subString = str.slice(pos, pos + 3)
      if (str.charAt(pos + 3).match(letterAndNumberRegex)) {
        return null;
      }
      pos++;
    }
    pos++;
  }
  pos++;
  return [{ token: 'VAR', lexem: subString, id: 1 }, pos] as const;
}

function getNumber(pos: number, str: string) {
  let subString = str.charAt(pos);
  if (str.charAt(pos + 1).match(numberRegex)) {
    subString = str.slice(pos, pos + 2)
    if (str.charAt(pos + 2).match(numberRegex)) {
      subString = str.slice(pos, pos + 3)
      if (str.charAt(pos + 3).match(numberRegex)) {
        return null;
      }
      pos++;
    }
    pos++;
  }
  pos++;
  return [{ token: 'NUM', lexem: subString, id: 2 }, pos] as const;
}

function getSpecialCharacter(pos: number, str: string) {
  let triple: Triple = { token: 'ERROR', lexem: 'ERROR', id: 0 }
  switch (str.charAt(pos)) {
    case "(":
      triple = { token: 'LPAR', lexem: "(", id: 3 }
      break;
    case ")":
      triple = { token: 'RPAR', lexem: ")", id: 4 }
      break;
    case "+":
      triple = { token: 'ADDOP', lexem: "+", id: 5 }
      break;
    case "-":
      triple = { token: 'SUBOP', lexem: "-", id: 6 }
      break;
    case "*":
      triple = { token: 'MULOP', lexem: "*", id: 7 }
      break;
    case "/":
      triple = { token: 'DIVOP', lexem: "/", id: 8 }
      break;
    case ">":
      triple = { token: 'LTOP', lexem: ">", id: 9 }
      break;
    case "<":
      triple = { token: 'STOP', lexem: "<", id: 10 }
      break;
    case "=":
      if (str.charAt(pos + 1) == '=') {
        triple = { token: 'EQOP', lexem: str.slice(pos, pos + 2), id: 11 }
        pos++;
      }
      break;
    case ":":
      if (str.charAt(pos + 1) == '=') {
        triple = { token: 'ASSIGNOP', lexem: str.slice(pos, pos + 2), id: 12 }
        pos++;
      }
      break;
    default:
      return null;
  }
  return [triple, pos] as const;
}
