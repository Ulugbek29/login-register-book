
const FRow = ({ label, children, position="vertical", required }) => {
  return (
    <div className={`w-full ${position}`} >
      <div className="font-semibold"> {required && <span className="requiredStart">*</span>} {label}:</div>
      <div className="w-full">{children}</div>
    </div>  
  )
}



export default FRow
