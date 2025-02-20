// below are filters that we can apply on the products
export const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'yellow', label: 'yellow', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
      { value: 'white', label: 'white', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: [0, 100], label: 'below 100$', checked: false },
      { value: [100, 200], label: '100$ to 200$', checked: false },
      { value: [200, 300], label: '200$ to 300$', checked: false },
      { value: [300, 400], label: '300$ to 400$', checked: false },
      { value: [400, 500], label: '400$ to 500$', checked: false },
      { value: [500, 1000], label: '500$ to 1000$', checked: false },
      { value: [1000, 2000], label: 'above 1000$', checked: false },
    ],
  },
]
// you can delete the "checked" property from the options of the above filters because i set the checkbox state of the input element using the url query/search params. see the function "getCheckBoxStateFromUrl"
