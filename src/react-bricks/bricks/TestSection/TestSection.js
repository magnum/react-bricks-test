import React from 'react'
import classNames from 'classnames'
import { Text, RichText, Plain, types } from 'react-bricks'

import BlockNames from '../BlockNames'

//=============================
// Padding enum
//=============================
const Padding = Object.freeze({
  Big: 'BIG',
  Small: 'SMALL',
})

//=============================
// Component to be rendered
//=============================
const TestSection = ({ title, text, padding, onChange }) => {
  return (
    <div
      className={classNames(
        'max-w-xl mx-auto px-6',
        { 'py-12': padding === Padding.Small },
        { 'py-20': padding === Padding.Big }
      )}
    >
      <Text
        renderBlock={props => (
          <h1 className="text-3xl sm:text-4xl text-center font-black text-gray-800 leading-tight mb-3">
            {props.children}
          </h1>
        )}
        value={title}
        placeholder="Type a title..."
        propName="title"
        onChange={onChange}
      />
      <RichText
        renderBlock={props => (
          <p className="text-xl text-center leading-relaxed text-gray-700">
            {props.children}
          </p>
        )}
        value={text}
        placeholder="Type a text..."
        propName="text"
        onChange={onChange}
        allowedFeatures={[
          types.RichTextFeatures.Bold,
          types.RichTextFeatures.Italic,
          types.RichTextFeatures.Highlight,
          types.RichTextFeatures.Code,
          types.RichTextFeatures.Link,
        ]}
        renderCode={props => (
          <code className="text-sm py-1 px-2 bg-gray-200 rounded">
            {props.children}
          </code>
        )}
      />
    </div>
  )
}

//=============================
// Get Default Props
//=============================
const getDefaultProps = () => ({
  padding: Padding.Big,
  title: Plain.deserialize('Test Section'),
  text: Plain.deserialize(
    "Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
  ),
})

//=============================
// Side Edit Props
//=============================
const sideEditProps = [
  {
    name: 'padding',
    label: 'Padding',
    type: types.SideEditPropType.Select,
    selectOptions: {
      display: types.OptionsDisplay.Select,
      options: [
        { value: Padding.Big, label: 'Big Padding' },
        { value: Padding.Small, label: 'Small Padding' },
      ],
    },
  },
]

//=============================
// Exported BlockType Schema
//=============================
const schema = {
  name: BlockNames.TestSection,
  label: 'Test Section',
  superType: types.BlockSuperType.Single,
  render: props => <TestSection {...props} />,
  getDefaultProps,
  sideEditProps,
  textEditProps: ['title', 'text'],
}

export default schema
