// Test JWT token generation
const { SignJWT } = require('jose');

async function testJWT() {
    console.log('🧪 Testing JWT Token Generation...\n');
    
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
        console.error('❌ JWT_SECRET is not set!');
        return;
    }
    
    console.log('JWT_SECRET length:', JWT_SECRET.length);
    console.log('JWT_SECRET value:', JWT_SECRET.substring(0, 20) + '...');
    console.log('');
    
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        
        const token = await new SignJWT({
            userId: 'test-user-id',
            email: 'test@example.com',
            role: 'ADMIN'
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(secret);
        
        console.log('✅ JWT token generated successfully!');
        console.log('Token length:', token.length);
        console.log('Token preview:', token.substring(0, 50) + '...');
        
    } catch (error) {
        console.error('❌ JWT generation failed:');
        console.error('Error:', error.message);
        console.error(error);
    }
}

testJWT();

