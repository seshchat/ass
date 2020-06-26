function createResponse(valid, reason) {
  return {
    valid,
    reason
  }
}

module.exports = function(assfile) {
  if(!assfile.port)
    return createResponse(false, 'no port specified')
  else if(!assfile.options || assfile.options.length === 0)
    return createResponse(false, 'no options specified')


  for(let i = 0; i < assfile.options.length; i++) {
    const option = assfile.options[i]
    if(!option.name)
      return createResponse(false, 'one option as no name')

    const { endpoints } = option
    if(endpoints.length === 0)
      return createResponse(false, `option ${option.name} has no endpoints`)

    for(let e = 0; e < endpoints.length; e++) {
      const endpoint = endpoints[e]

      if(!endpoint.endpoint)
        return createResponse(false, `one endpoint in ${option.name} has no endpoint`)
      else if(!endpoint.method)
        return createResponse(false, `endpoint ${endpoint.endpoint} in ${option.name} has no method`)
    }
  }

  return createResponse(true)
}
