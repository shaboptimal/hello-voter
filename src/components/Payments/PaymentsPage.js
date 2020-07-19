import React, { useState, useEffect } from 'react'
import { DataTable, Link } from 'carbon-components-react'
import { Add16 } from '@carbon/icons-react'
import styled from 'styled-components'
import { colors, spacing } from '../../theme'
import PageLayout from '../PageLayout'
import Breadcrumbs from '../Breadcrumbs'
import Button from '../Button'
import Loading from '../Loading'

import { AppContext } from '../../api/AppContext'

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

const SectionTitle = styled.h5`
  margin-top: ${ spacing[7] };
  margin-bottom: ${ spacing[2] };
`

const AcctTable = styled.div`
  display: flex;
  background-color: ${ colors.gray[10] };
  width: 100%;
  padding: ${ spacing[5] };
  margin-top: ${ spacing[3] };
`

const AcctNumber = styled.div`
  flex: 1 1 auto;
  margin-left: ${ spacing[3] };
`

const TableContainerStyled = styled(TableContainer)`
  min-width: 100%;
  margin-top: ${ spacing[3] };
`

const renderTable = ({
  rows,
  headers,
  getHeaderProps,
}) => (
  <TableContainerStyled>
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader key={header.key} {...getHeaderProps({ header })}>
              {header.header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {row.cells.map((cell) => (
              <TableCell key={cell.id}>{cell.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainerStyled>
);

const headers = [
  {
    key: 'date',
    header: 'Date',
  },
  {
    key: 'tripler',
    header: 'Tripler Name',
  },
  {
    key: 'amount',
    header: 'Amount',
  },
];

const PaymentTable = ({ data }) => (
  <DataTable render={renderTable} headers={headers} rows={data} />
);

const Payments = ({ pending, completed, plaidAcct }) => {
  const hasPending = pending && pending.length > 0;
  const hasCompleted = completed && completed.length > 0;

  return (
    <>
      <SectionTitle>Your payment account</SectionTitle>
      {plaidAcct ? (
        <AcctTable>
          <div>Account #:</div>
          <AcctNumber>**** **** **** {plaidAcct.accounts[0].mask}</AcctNumber>
          <Link href="/payments/add">Link</Link>
        </AcctTable>
      ) : (
        <Button href="/payments/add">
          Add an Account
          <Add16 />
        </Button>
      )}

      <SectionTitle>Payments pending</SectionTitle>
      <PaymentTable data={hasPending ? pending : []} />

      <SectionTitle>Completed payments</SectionTitle>
      <PaymentTable data={hasCompleted ? completed : []} />
    </>
  );
};

const PaymentsPage = ({ payments, plaidAcct }) => {
  const pending = payments.filter((payment) => payment.status === 'pending')
  const completed = payments.filter((payment) => payment.status === 'completed')
  
  return (
    <PageLayout
      title="My Vote Triplers"
      header={<Breadcrumbs items={
        [
          {
            name: "Home",
            route: "/"
          },
          {
            name: "Payments",
            route: "/"
          }
        ]
      }/>}
    >
      <Payments
        plaidAcct={plaidAcct}
        pending={pending}
        completed={completed}
      />
    </PageLayout>
  )
}

export default () => {
  // const [payments, setPayments] = useState(null)
  // const { api } = React.useContext(AppContext)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await api.fetchPayments()
  //     setPayments(data.data)
  //   }
  //   fetchData()
  // }, [])
  return (
    payments ? <PaymentsPage payments={payments} plaidAcct={plaidAcct} /> : <Loading />
  )
}