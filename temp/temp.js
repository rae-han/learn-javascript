const testcase = [
  { key: '1111', value: 'one' },
  { key: '2222', value: 'two' },
  { key: '3333', value: 'three' },
]

const newList = list => list.reduce((acc, cur) => ({
  ...acc,
  [cur.key]: undefined
}), {})

console.log(newList(testcase))

let connection = await mysql.createConnection({
  host    : process.env['MYSQL_HOST'], 
  user    : process.env['MYSQL_USER'],
  password: process.env['MYSQL_PASSWORD'],
  database: process.env['MYSQL_DATABASE'],
  connectionLimit : 60
}),
queryEmails = Array.from(new Set(event['emails'])),
[rows, fields] = await connection.query("SELECT email FROM users WHERE email IN (?)", [queryEmails]),
emailExists = rows.map(row => row['email']),
results = {
  found: emailExists,
  not_found: queryEmails.subtract(emailExists)
};