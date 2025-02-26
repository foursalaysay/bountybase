import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get('wallet');

    if (!wallet) {
      return NextResponse.json({
        user: {
          username: '',
          email: '',
          wallet: '',
        },
        stats: {
          bountiesFixed: 0,
          totalEarned: 0,
          reputation: 0
        }
      });
    }

    const user = await prisma.user.findUnique({
      where: { wallet },
      select: {
        username: true,
        email: true,
        wallet: true,
        bountiesFixed: true,
        totalEarned: true,
        reputation: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        user: {
          username: '',
          email: '',
          wallet: '',
        },
        stats: {
          bountiesFixed: 0,
          totalEarned: 0,
          reputation: 0
        }
      });
    }

    // Separate user profile and stats data
    const { username, email, wallet: userWallet, ...statsData } = user;

    return NextResponse.json({
      user: {
        username,
        email,
        wallet: userWallet,
      },
      stats: statsData
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({
      user: {
        username: '',
        email: '',
        wallet: '',
      },
      stats: {
        bountiesFixed: 0,
        totalEarned: 0,
        reputation: 0
      }
    });
  }
} 
