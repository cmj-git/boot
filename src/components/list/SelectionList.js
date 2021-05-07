import React, { useRef, useState } from 'react';
import { useSize } from 'ahooks';
import useLayout from '@/components/hooks/useLayout';
import ContainerContext from '@/components/AutoX/ContainerContext';


export default function SelectionList(props) {
  const { children, items, layout, cart, onItemClick= () => {console.log('未设置SelectedList onItemClick点击事件')} } = props;
  const [layoutRef, { getClassName }] = useLayout();
  const containerRef = useRef();
  const size = useSize(containerRef);

  const Child = React.Children.only(children);

  const [currIndex, setCurrIndex] = useState(0)

  function onSelected (index) {
    setCurrIndex(index)
  }

  return <div
    style={{
      overflow: 'auto',
      position: 'relative',
    }}
    className={getClassName()}
    ref={containerRef}
  >
    <ContainerContext.Provider value={size}>
        {items.map((item, i) => {

          return <div key={i} onClick={() => onSelected(i)}
          >
            {
              React.isValidElement(Child) ?
              React.cloneElement(Child, {
                  ...item,
                  ...layout,
                  layout:layout,
                  cart:cart,
                  key: i,
                  ref: layoutRef,
                  onItemClick: onItemClick,
                  isLastItem: items.length == (i+1) ? true : false,
                  isSelected: i == currIndex ? true : false
              })
              : <Child key={i} {...item } {...layout} layout={layout} cart={cart} ref={layoutRef} onItemClick={onItemClick} 
                  isSelected={i == currIndex ? true : false}
              />
            }
          </div>

           
        })}
    </ContainerContext.Provider>
  </div>
}

