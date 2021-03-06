function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const React = require('react');

const {
  useState,
  useEffect
} = require('react');

const NamedLayout = require("../components/NamedLayout"); // const presenter = require('@/components/presenter');


const useLayout = require("../utils/useLayout");

const GateWay = require("../components/GateWay");

const requireConfig = require("../utils/requireConfig");

const promiseAjax = require("../utils/request"); // const allComponents = {
//   ...presenter,
// };


module.exports = function AutoX(props) {
  const parent = module.parents[0];
  const {
    config = requireConfig(parent),
    allComponents = {}
  } = props;
  const [cfg, setCfg] = useState(config);
  const {
    layout,
    ...restCfg
  } = cfg || {};
  const {
    children,
    ...restLayout
  } = layout || {};
  const [layoutRef, {
    getClassName
  }] = useLayout();
  useEffect(_ => {
    const reg = /.\/src\/pages\/([\w\/]+)\/[\w.]+$/.exec(parent);
    let parentPath;

    if (reg) {
      parentPath = reg[1];
    }

    console.log('parent111 = ', parent);
    console.log('reg111 = ', reg);
    console.log('parentPath111 = ', parentPath);

    if (cfg === undefined) {
      promiseAjax(`/${parentPath}/layout.json`, {
        _t: new Date().getTime()
      }).then(data => {
        setCfg(data);
      });
    }
  }, []); // console.log('cfg = ', cfg)
  // console.log('getClassName = ', getClassName())

  return /*#__PURE__*/React.createElement("div", {
    className: getClassName()
  }, cfg ? /*#__PURE__*/React.createElement(NamedLayout, _extends({}, restLayout, {
    ref: layoutRef
  }), children.map((child, i) => {
    const {
      name,
      span,
      gateway
    } = child;
    const C = allComponents[name] || tips(name);
    let gatewayProps = { ...restCfg
    };

    if (gateway && typeof gateway === 'object' && gateway.props) {
      gatewayProps = { ...gatewayProps,
        ...gateway.props
      };
    }

    return /*#__PURE__*/React.createElement(GateWay, _extends({
      key: i
    }, gatewayProps, {
      span: span
    }), /*#__PURE__*/React.createElement(C, {
      name: name
    }));
  })) : '');
};

function tips(name) {
  return _ => `${name} ?????????`;
}