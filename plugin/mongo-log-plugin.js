import _ from 'lodash'
import LogModel from '../schemas/log-model'
import { getDiff } from '../utils/diff'


const mongoLogPlugin = function (schema) {

    schema.post('init', doc => {

        doc._original = doc.toObject({ transform: false })

    })


    schema.pre('save', function (next) {

        if (this.isNew) {

            next()

        } else {

            this._diff = getDiff(this, this._original)

            next()
        }
    })


    schema.methods.log = function (data) {

        data.diff = {

            before: this._original,

            after: this._diff,

        }

        return LogModel.create(data)

    }
}
module.exports = mongoLogPlugin