import mongoose from 'mongoose';

const userSchema =  mongoose.Schema({
    name : {
        type: String,
        required: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    country: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: false
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(p) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(p);
            },
            message: "Password must be at least 8 characters long and should contain at least one digit, upper case, lower case ,special character"
        }
    },
    userType: {
        type: String,
        enum: [ "USER", "AUTHOR", "MODERATE", "ADMIN"],
        default: "USER"
    }
    
}, {
    timestamps: true 
});

const User = mongoose.model("users", userSchema);

export default User;