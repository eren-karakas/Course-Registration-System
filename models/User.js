const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'Teacher', 'Admin'],
        default: 'Student'
    },
    slug: {
        type: String,
        unique: true
    },
    courses : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

UserSchema.pre('save', function(next){
    const user = this;
    if(!this.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

UserSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        strict: true,
        lower: true
    });
    next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;