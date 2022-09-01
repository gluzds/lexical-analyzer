import { Button, Flex, HStack, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { Instructions } from '../components/InstructionsTable';
import { analyze, Triple } from '../utils/lexicalAnalyzer';

export default function Home() {
  const [string, setString] = useState('');
  const [results, setResults] = useState<Triple[] | undefined>(undefined);
  const [error, setError] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setString(event.target.value)

  function analyzeLexem() {
    const data = analyze(string);
    if (data === null) {
      setError(true);
      setResults(undefined);
    } else {
      setError(false);
      setResults(data);
    }
  }

  return (
    <Flex align="center" justify="center" flexDirection="column" mt={10}>
      <Text fontSize="3xl">Analisador léxico</Text>
      <HStack spacing={3} mt={10}>
        <Input placeholder="String" w="400px" onChange={handleChange} />
        <Button colorScheme="red" onClick={() => analyzeLexem()}>Analisar</Button>
      </HStack>
      {
        error &&
        <Text
          as='i'
          fontSize='sm'
          color="red"
          pt={1}
          marginRight={40}
        >
          Função inválida, por favor verifica as instruções abaixo.
        </Text>
      }
      {results ?
        (
          <TableContainer mt={10} width="720px">
            <Table variant='simple' size='lg'>
              <TableCaption color="gray.300">Resultado das triplas</TableCaption>
              <Thead>
                <Tr>
                  <Th color="gray.300">Token</Th>
                  <Th color="gray.300">Lexema</Th>
                  <Th isNumeric color="gray.300">ID</Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((result, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{result.token}</Td>
                      <Td>{result.lexem}</Td>
                      <Td isNumeric>{result.id}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )
        : <Instructions />
      }
    </Flex>
  )
}

