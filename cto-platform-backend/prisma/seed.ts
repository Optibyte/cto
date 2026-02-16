import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Deterministic valid V4 UUIDs
const MARKET_ID = '11111111-1111-4111-8111-111111111111';
const ACCOUNT_ID = '22222222-2222-4222-8222-222222222222';
const USER_IDS = [
    '33333333-3333-4333-8333-333333330001',
    '33333333-3333-4333-8333-333333330002',
    '33333333-3333-4333-8333-333333330003',
    '33333333-3333-4333-8333-333333330004',
    '33333333-3333-4333-8333-333333330005',
];
const TEAM_IDS = [
    '44444444-4444-4444-8444-444444440001',
    '44444444-4444-4444-8444-444444440002',
    '44444444-4444-4444-8444-444444440003',
    '44444444-4444-4444-8444-444444440004',
    '44444444-4444-4444-8444-444444440005',
];
const SLA_IDS = [
    '55555555-5555-4555-8555-555555550001',
    '55555555-5555-4555-8555-555555550002',
];

async function main() {
    console.log('🌱 Seeding database with valid UUIDs...');

    // 1. Create Users first (no dependencies)
    const users = await Promise.all([
        prisma.user.upsert({
            where: { email: 'alice@example.com' },
            update: { id: USER_IDS[0] },
            create: {
                id: USER_IDS[0],
                auth0Id: 'auth0|alice',
                email: 'alice@example.com',
                fullName: 'Alice Johnson',
                role: 'TeamLead',
                avatarUrl: '/avatars/alice.jpg',
            },
        }),
        prisma.user.upsert({
            where: { email: 'bob@example.com' },
            update: { id: USER_IDS[1] },
            create: {
                id: USER_IDS[1],
                auth0Id: 'auth0|bob',
                email: 'bob@example.com',
                fullName: 'Bob Smith',
                role: 'TeamLead',
                avatarUrl: '/avatars/bob.jpg',
            },
        }),
        prisma.user.upsert({
            where: { email: 'charlie@example.com' },
            update: { id: USER_IDS[2] },
            create: {
                id: USER_IDS[2],
                auth0Id: 'auth0|charlie',
                email: 'charlie@example.com',
                fullName: 'Charlie Brown',
                role: 'TeamLead',
                avatarUrl: '/avatars/charlie.jpg',
            },
        }),
        prisma.user.upsert({
            where: { email: 'diana@example.com' },
            update: { id: USER_IDS[3] },
            create: {
                id: USER_IDS[3],
                auth0Id: 'auth0|diana',
                email: 'diana@example.com',
                fullName: 'Diana Prince',
                role: 'TeamLead',
                avatarUrl: '/avatars/diana.jpg',
            },
        }),
        prisma.user.upsert({
            where: { email: 'edward@example.com' },
            update: { id: USER_IDS[4] },
            create: {
                id: USER_IDS[4],
                auth0Id: 'auth0|edward',
                email: 'edward@example.com',
                fullName: 'Edward Kim',
                role: 'TeamLead',
                avatarUrl: '/avatars/edward.jpg',
            },
        }),
    ]);
    console.log('✅ Created users:', users.length);

    // 2. Create Market
    const market = await prisma.market.upsert({
        where: { id: MARKET_ID },
        update: {},
        create: {
            id: MARKET_ID,
            name: 'North America',
            regionCode: 'NA',
        },
    });
    console.log('✅ Created market:', market.name);

    // 3. Create Account (depends on Market and User)
    const account = await prisma.account.upsert({
        where: { id: ACCOUNT_ID },
        update: {
            marketId: market.id,
            accountManagerId: users[0].id
        },
        create: {
            id: ACCOUNT_ID,
            name: 'Tech Corp',
            marketId: market.id,
            accountManagerId: users[0].id,
        },
    });
    console.log('✅ Created account:', account.name);

    // 4. Create Teams (depends on Account and User)
    const team1 = await prisma.team.upsert({
        where: { id: TEAM_IDS[0] },
        update: { accountId: ACCOUNT_ID, teamLeadId: users[0].id },
        create: {
            id: TEAM_IDS[0],
            name: 'Team Alpha',
            description: 'Core platform development team',
            accountId: ACCOUNT_ID,
            teamLeadId: users[0].id,
        },
    });

    const team2 = await prisma.team.upsert({
        where: { id: TEAM_IDS[1] },
        update: { accountId: ACCOUNT_ID, teamLeadId: users[1].id, parentTeamId: team1.id },
        create: {
            id: TEAM_IDS[1],
            name: 'Team Beta',
            description: 'Mobile app development',
            accountId: ACCOUNT_ID,
            teamLeadId: users[1].id,
            parentTeamId: team1.id,
        },
    });

    const team3 = await prisma.team.upsert({
        where: { id: TEAM_IDS[2] },
        update: { accountId: ACCOUNT_ID, teamLeadId: users[2].id },
        create: {
            id: TEAM_IDS[2],
            name: 'Team Gamma',
            description: 'DevOps and infrastructure',
            accountId: ACCOUNT_ID,
            teamLeadId: users[2].id,
        },
    });

    const team4 = await prisma.team.upsert({
        where: { id: TEAM_IDS[3] },
        update: { accountId: ACCOUNT_ID, teamLeadId: users[3].id, parentTeamId: team1.id },
        create: {
            id: TEAM_IDS[3],
            name: 'Team Delta',
            description: 'QA and testing',
            accountId: ACCOUNT_ID,
            teamLeadId: users[3].id,
            parentTeamId: team1.id,
        },
    });

    const team5 = await prisma.team.upsert({
        where: { id: TEAM_IDS[4] },
        update: { accountId: ACCOUNT_ID, teamLeadId: users[4].id },
        create: {
            id: TEAM_IDS[4],
            name: 'Team Epsilon',
            description: 'Data engineering',
            accountId: ACCOUNT_ID,
            teamLeadId: users[4].id,
        },
    });

    const teams = [team1, team2, team3, team4, team5];
    console.log('✅ Created teams:', teams.length);

    // 5. Create Metrics
    const metricsToCreate: Prisma.MetricCreateManyInput[] = [];
    const now = new Date();

    for (let i = 0; i < 30; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        teams.forEach((team) => {
            // Velocity
            metricsToCreate.push({
                teamId: team.id,
                userId: team.teamLeadId,
                metricType: 'velocity',
                value: 200 + Math.random() * 100,
                unit: 'points',
                source: 'jira',
                createdBy: team.teamLeadId,
                time: date,
            });

            // Quality
            metricsToCreate.push({
                teamId: team.id,
                userId: team.teamLeadId,
                metricType: 'quality',
                value: 85 + Math.random() * 15,
                unit: '%',
                source: 'github',
                createdBy: team.teamLeadId,
                time: date,
            });

            // Throughput
            metricsToCreate.push({
                teamId: team.id,
                userId: team.teamLeadId,
                metricType: 'throughput',
                value: 40 + Math.random() * 20,
                unit: 'issues',
                source: 'jira',
                createdBy: team.teamLeadId,
                time: date,
            });

            // Cycle Time
            metricsToCreate.push({
                teamId: team.id,
                userId: team.teamLeadId,
                metricType: 'cycle_time',
                value: 20 + Math.random() * 15,
                unit: 'hours',
                source: 'jira',
                createdBy: team.teamLeadId,
                time: date,
            });
        });
    }

    await prisma.metric.createMany({
        data: metricsToCreate,
        skipDuplicates: true,
    });
    console.log('✅ Created metrics:', metricsToCreate.length);

    // 6. Create SLAs
    const slas = await Promise.all([
        prisma.sLADefinition.upsert({
            where: { id: SLA_IDS[0] },
            update: { teamId: teams[0].id },
            create: {
                id: SLA_IDS[0],
                name: 'Response Time SLA',
                description: 'Customer support first response time',
                teamId: teams[0].id,
                metricType: 'response_time',
                targetValue: 2,
                thresholdWarning: 1.6,
                thresholdCritical: 1.8,
                measurementWindow: '24h',
            },
        }),
        prisma.sLADefinition.upsert({
            where: { id: SLA_IDS[1] },
            update: { teamId: teams[2].id },
            create: {
                id: SLA_IDS[1],
                name: 'Deployment Frequency',
                description: 'Number of deployments per week',
                teamId: teams[2].id,
                metricType: 'deployment_frequency',
                targetValue: 10,
                thresholdWarning: 8,
                thresholdCritical: 7,
                measurementWindow: '7d',
            },
        }),
    ]);
    console.log('✅ Created SLA definitions:', slas.length);

    console.log('✨ Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
