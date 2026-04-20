# Mail Implementation Patterns

## 📂 Producer: Sending a Mail Event
```typescript
await this.kafkaService.produce(KafkaTopic.AUTH_MAIL, [{
  key: user.id,
  value: JSON.stringify({
    pattern: 'send-otp',
    data: { email: user.email, otp: '123456' },
    metadata: { timestamp: Date.now() }
  })
}]);
```

## 🛠️ Consumer: Handling Events
```typescript
switch (pattern) {
  case 'send-otp':
    await this.mailService.sendOtp(data.email, data.otp);
    break;
  // Add new patterns here
}
```

## 📧 Service: SMTP Execution
```typescript
async sendMail(email: string, template: string, context: object) {
  await this.mailerService.sendMail({
    to: email,
    template: `./${template}`,
    context: {
      ...context,
      appName: 'Nest Base',
      currentYear: new Date().getFullYear(),
    },
  });
}
```

## ⚙️ DLQ Logic (Safety Net)
```typescript
try {
  // process
} catch (error) {
  await this.kafkaService.produce(KafkaTopic.AUTH_MAIL_DLQ, [{
    value: JSON.stringify({ originalPayload, error: error.message, failedAt: new Date() })
  }]);
}
```
