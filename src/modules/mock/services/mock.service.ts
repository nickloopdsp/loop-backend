import { Injectable } from '@nestjs/common';
import { MockTrendingDto, MockHealthMetricsDto, MockGeoDataDto, MockTodoDto, MockChatMessageDto } from '../dto/mock.dtos';

@Injectable()
export class MockService {
  getHealthMetrics() {
    const healthMetrics: MockHealthMetricsDto = {
      streams: "2.1M",
      followers: "45.8K",
      revenue: "$8,540",
      streamGrowth: 12.5,
      followersGrowth: 8.3,
      revenueGrowth: 15.2,
    }
    return healthMetrics;
  }

  getTrending() {
    const trendings: MockTrendingDto[] = [
      { rank: 1, name: "Synthwave Revival", mentions: "2.3K", growth: 45 },
      { rank: 2, name: "LoFi Beats", mentions: "1.8K", growth: 32 },
      { rank: 3, name: "Ambient Chill", mentions: "1.2K", growth: 28 },
      { rank: 4, name: "Electronic Pop", mentions: "0.9K", growth: 18 },
      { rank: 5, name: "Indie Rock", mentions: "0.7K", growth: 12 },
    ]
    return trendings;
  }

  getGeoData() {
    const geoData: MockGeoDataDto = {
      topRegion: { name: "North America", listeners: "125K" },
      secondRegion: { name: "Europe", listeners: "89K" },
      thirdRegion: { name: "Asia-Pacific", listeners: "43K" },
    }
    return geoData;
  }

  getTodos() {
    const todos: MockTodoDto[] = [
      {
        id: "1",
        title: "Release new single",
        description: "Finalize mastering and distribution",
        status: "todo",
        dueDate: "2024-01-20",
      },
      {
        id: "2",
        title: "Update social media",
        description: "Post about upcoming release",
        status: "todo",
        dueDate: "2024-01-19",
      },
      {
        id: "3",
        title: "Studio session prep",
        description: "Prepare for next recording session",
        status: "in-progress",
      },
      {
        id: "4",
        title: "Album artwork review",
        description: "Review and approve final artwork",
        status: "done",
      },
    ]
    return todos;
  }

  getChatMessages() {
    const chatMessages: MockChatMessageDto[] = [
      {
        id: "1",
        sender: "mc",
        message: "Hi Alex! I've been analyzing your recent performance. Your latest track is gaining great momentum! 🎵",
        timestamp: new Date(Date.now() - 300000).toISOString(),
      },
      {
        id: "2",
        sender: "user",
        message: "That's great! What should I focus on next?",
        timestamp: new Date(Date.now() - 240000).toISOString(),
      },
      {
        id: "3",
        sender: "mc",
        message: "Based on your fan engagement, I recommend:\n• Schedule 3 more social posts this week\n• Consider a live stream session\n• Engage with trending #synthwave hashtag",
        timestamp: new Date(Date.now() - 180000).toISOString(),
      },
    ]
    return chatMessages;
  }
}
