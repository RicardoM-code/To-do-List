

function ButtonRemoveAll({removeAll}) {
  return (
    <div className="clear">
        <button onClick={() => removeAll()}>Limpar lista</button>
    </div>
  )
}

export default ButtonRemoveAll