module.exports = {
  items: [
    { test: 123 },
    { test: 456 },
  ],
  tabs: {},
  layout: {
    name: 'Grid',
    props: {
      col: 4
    },
    children: [
      {
        name: 'NamedList',
        span: 1,
        gateway: {
          name: 'Gateway',
          props: {
            field: 'items',
            converter: {
              key: 'name',
              value: 'option'
            }
          }
        }
      },
      {
        name: 'Tab',
        span: 1,
        gateway: {
          name: 'Gateway',
          props: {
            field: 'items'
          }
        }
      },
      {
        name: "Tab",
        span: 1,
        gateway: "MyDefinedGateway"
      }
    ]
  },
};