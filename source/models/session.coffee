###
@todo
###

storage = require "../modules/storage"

module.exports = class Session extends Hamsa

  @define
    id            : type: String
    mail          : type: String
    token         : type: String
    username      : type: String
    name          : type: String
    bio           : type: String
    image         : type: String
    wallet        : type: Number, default: 0

    secrets       : type: Array
    purchases     : type: Array
    tips          : type: Array

    followers     : type: Array
    following     : type: Array

    updated_at    : type: Date
    created_at    : type: Date, default: new Date()

  @update = ->
    promise = new Hope.Promise()
    @destroyAll()

  @instance = -> @find()[0]
