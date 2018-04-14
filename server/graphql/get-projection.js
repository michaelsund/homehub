const getProjection = fieldASTs =>
  fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = 1
    return projections
  }, {})

export default getProjection
