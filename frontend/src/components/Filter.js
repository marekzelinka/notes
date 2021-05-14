const Filter = ({ value, onClick }) => {
  const label = value ? 'show important' : 'show all'

  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  )
}

export default Filter
