import '../styles/button.css'


const Button = ({button, handlebutton}) => {
	const operatorClass = button.type === 'operator' ? 'operator-button' : '';
	const acClass = button.value === 'All Clear'? 'ac-button' : '';


	return (
		<button onClick={()=>handlebutton(button)} 
		className={`buttonWrapper ${operatorClass} ${acClass} `} 
		>
			<span className='popout'>
			{button.text}
			</span>
		</button>
	)
}

export default Button