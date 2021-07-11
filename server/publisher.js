const webPush = require('web-push');
const faker = require('faker');

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fbq1fLsnQW8:APA91bH8rBJLHJ_6dx7tIgCosZKkgWwgdGNe5PEDUWt--FKY9H-UdtpVkTA3YKftEMYAGAPtkjsNxjYdZvxSlqQR9OO0FcPk57D39mgpp_EXpogOedo3wSIUqqb08GvoH86PgSfm8LBQ",
    "expirationTime": null,
    "keys": {
        "p256dh": "BO0WAggmb3HwbXRb5S1Xs1F21sZG6S3YOe1-VFre8XC6t2QT6Fj2tkGrT3VRfNUEHuP7RaVZ9zxK0kILNL3ipio",
        "auth": "PoC_a_VxDx86RqVnR8kElw"
    }
}

const vapidPublicKey = 'BEpKf2mbAg_uXFp5ybLo3Vz-C7HtBxnx9SRlx0KOzj6lnh7rS-rgWHhYVDyF-cJbF3hTg6lsHSLVhHQEb48V6-M';
const vapidPrivateKey = 'rRSdqOwwLhvw9OYiD4bBeTHpn8TiToff50_0-D1JyfU';

const options = {
    TTL: 60,
    vapidDetails: {
        subject: 'mailto: research.ciffer@gmail.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }
};

const notify = (subscribers) => {
    const transaction = faker.helpers.createTransaction()

    if (subscribers.size < 1) {
        console.log("No subscribers to notify");
        return;
    }

    subscribers.forEach((subscriber, id) => {

        webPush.sendNotification(
            subscriber,
            JSON.stringify(transaction),
            options
        )
        .then(() => console.log(`${subscribers.size} subscribers notified.`))
        .catch(error => console.error('Error in pushing notification', error))

    });
        
}

module.exports = {
    notify: notify
}
