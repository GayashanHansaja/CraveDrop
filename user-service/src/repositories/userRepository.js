import { User, Address, MobileNumber } from '../models/index.js';

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async findById(userId) {
        return await User.findByPk(userId, {
            include: [
                { model: Address, as: 'address' },
                { model: MobileNumber, as: 'mobileNumbers' }
            ]
        });
    }

    async createUser(data) {
        const {
            firstname, lastname, email, password,
            contactNumber, address, pic
        } = data;

        // Create the user
        const user = await User.create({ firstname, lastname, email, password, pic });

        // Create the address
        if (address) {
            await Address.create({ ...address, userId: user.userId });
        }

        // Create mobile numbers
        if (contactNumber) {
            await MobileNumber.create({ number: contactNumber, userId: user.userId });
        }

        return this.findById(user.userId); // Return full user with associations
    }

    async updateUser(user, updatedData = {}) {
        const {
            firstname, lastname, email, password,
            contactNumber, birthday, pic, address
        } = updatedData;

        // Update base fields
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (email) user.email = email;
        if (password) user.password = password;
        if (contactNumber) user.contactNumber = contactNumber;
        if (birthday) user.birthday = birthday;
        if (pic) user.pic = pic;

        // Save user changes
        await user.save();

        // Update or create address
        if (address) {
            const currentAddress = await Address.findOne({ where: { userId: user.userId } });
            if (currentAddress) {
                await currentAddress.update(address);
            } else {
                await Address.create({ ...address, userId: user.userId });
            }
        }

        return this.findById(user.userId);
    }

    async deleteById(userId) {
        // Delete address and mobile numbers first (foreign key constraints)
        await Address.destroy({ where: { userId } });
        await MobileNumber.destroy({ where: { userId } });
        return await User.destroy({ where: { userId } });
    }
}

export default new UserRepository();
