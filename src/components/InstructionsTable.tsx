import { Text, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, ListItem, UnorderedList } from "@chakra-ui/react"

type Content = {
  token: string,
  lexem: string,
  id: number,
}

const tableContent: Content[] = [
  { token: "VAR", lexem: "Nomes de variáveis", id: 1 },
  { token: "NUM", lexem: "Números inteiros", id: 2 },
  { token: "LPAR", lexem: "(", id: 3 },
  { token: "RPAR", lexem: ")", id: 4 },
  { token: "ADDOP", lexem: "+", id: 5 },
  { token: "SUBOP", lexem: "-", id: 6 },
  { token: "MULOP", lexem: "*", id: 7 },
  { token: "DIVOP", lexem: "/", id: 8 },
  { token: "LTOP", lexem: ">", id: 9 },
  { token: "STOP", lexem: "<", id: 10 },
  { token: "EQOP", lexem: "==", id: 11 },
  { token: "ASSIGNOP", lexem: ":=", id: 12 },
]

export function Instructions() {
  return (
    <VStack mt={8} maxW="480px">
      <Text>Intruções de uso:</Text>
      <UnorderedList pb={10}>
        <ListItem>Variáveis não podem começar com dígitos e podem ter dígitos e caracteres depois do segundo símbolo;</ListItem>
        <ListItem>As expressões possuem apenas números inteiros;</ListItem>
        <ListItem>Números negativos não são suportados;</ListItem>
        <ListItem>Considere que os lexemas relativos aos números terão tamanho menor 3 dígitos. A mesma restrição de tamanho se aplica aos nomes de variáveis.</ListItem>
      </UnorderedList>
      <TableContainer width="480px">
        <Table variant="simple" size="sm" colorScheme="whiteAlpha">
          <TableCaption color="gray.300">Tabela de tokens</TableCaption>
          <Thead>
            <Tr>
              <Th color="gray.300">Token</Th>
              <Th color="gray.300">Lexema</Th>
              <Th isNumeric color="gray.300">ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableContent.map((content, index) => {
              return (
                <Tr key={index}>
                  <Td>{content.token}</Td>
                  <Td>{content.lexem}</Td>
                  <Td isNumeric>{content.id}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}