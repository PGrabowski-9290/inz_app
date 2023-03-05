const check = (t) => {
	switch (typeof t){
		case "string":
			return Boolean(t === '')
		case "object":
			return Boolean(t.length === 0)
		case "number":
			return Boolean(t)
		default:
			return false
	}
}

export function isValid(test, setErrorState) {
	let error = false
	let tmp = {}
	for (const [key, val] of Object.entries(test)) {
		tmp[key] = check(val)
		if (check(val))
			error = true
	}
	setErrorState(tmp)
	console.log(error)
	return error
}
