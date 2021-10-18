export const data = [
  {
    id: 1,
    data: 'pergunta 1',
    children: [
      {
        id: 2,
        data: 'resposta 1',
        children: [
          {
            id: 4,
            data: 'pergunta 2',
            children: [
              {
                id: 5,
                data: 'resposta 4',
                children: []
              }
            ]

          }
        ]
      },
      {
        id: 3,
        data: 'resposta 2',
        children: []

      }
    ]
  }
]

let newGraph = []

function traverseAndCompose(data, previousNode = null) {

  data.forEach((node) => {
    newGraph.push({
      id: node.id,
      data: node.data
    })
  })

  data.forEach((node) => {

    if(previousNode !== null) {
      newGraph.push({
        source: previousNode.id,
        target: node.id
      })
    }

    if(node.children?.length === 0) {
      newGraph.push({
        id: node.id,
        data: node.data
      })
    }

    if(node.children) {
      newGraph.push({
        id: node.id,
        data: node.data
      })
      traverseAndCompose(node.children, node)
    }
  })

  return newGraph
}

function removeRepetitive(arr) {
  return arr.filter((node, i, array) => array.findIndex(t => (t.id === node.id)) === i || node.target)
}

function formatToFlow(arr) {

  let formatted = []

  arr.forEach((node) => {
    if(node.data) {
      formatted.push({
        id: node.id,
        data: {
          label: node.data
        },
        position: { x: 0, y: 0 }
      })
    } else {
      formatted.push({
        id: `${node.source}-${node.target}`,
        source: `${node.source}`,
        target: `${node.target}`,
        type: 'straight'
      })
    }
  })

  return formatted
}

export default function transformTree(data) {
  return formatToFlow(removeRepetitive(traverseAndCompose(Array.from(data))))
} 