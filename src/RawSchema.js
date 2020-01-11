'use strict'
const merge = require('deepmerge')
const { BaseSchema } = require('./BaseSchema')
const { NullSchema } = require('./NullSchema')
const { BooleanSchema } = require('./BooleanSchema')
const { StringSchema } = require('./StringSchema')
const { NumberSchema } = require('./NumberSchema')
const { IntegerSchema } = require('./IntegerSchema')
const { ObjectSchema } = require('./ObjectSchema')
const { ArraySchema } = require('./ArraySchema')
const { MixedSchema } = require('./MixedSchema')
const { toArray } = require('./utils')

/**
 * Represents a raw JSON Schema that will be parsed
 * @param {Object} schema
 * @returns {FluentSchema}
 */

const RawSchema = (schema = {}) => {
  const { type, definitions, properties, required, ...props } = schema
  switch (schema.type) {
    case 'string': {
      const schema = {
        type,
        ...props,
      }
      return StringSchema({ schema, factory: StringSchema })
    }

    case 'integer': {
      const schema = {
        type,
        ...props,
      }
      return IntegerSchema({ schema, factory: NumberSchema })
    }
    case 'number': {
      const schema = {
        type,
        ...props,
      }
      return NumberSchema({ schema, factory: NumberSchema })
    }

    case 'boolean': {
      const schema = {
        type,
        ...props,
      }
      return BooleanSchema({ schema, factory: BooleanSchema })
    }

    case 'object': {
      const schema = {
        type,
        definitions: toArray(definitions) || [],
        properties: toArray(properties) || [],
        required: required || [],
        ...props,
      }
      return ObjectSchema({ schema, factory: ObjectSchema })
    }

    case 'array': {
      const schema = {
        type,
        ...props,
      }
      return ArraySchema({ schema, factory: ArraySchema })
    }

    default: {
      const schema = {
        ...props,
      }

      return BaseSchema({
        schema,
        factory: BaseSchema,
      })
    }
  }
}

module.exports = {
  RawSchema,
  default: RawSchema,
}
