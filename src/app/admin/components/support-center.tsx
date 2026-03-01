'use client';

import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Ticket,
  Users,
  BarChart3,
  Search,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Chat from './ChatComp';

const supportCards = [
  {
    title: 'Support Chats',
    count: 152,
    label: 'Chats',
    icon: MessageSquare,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
  },
  {
    title: 'Ticket Inbox',
    count: 152,
    label: 'Chats',
    icon: Ticket,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
  },
  {
    title: 'Memberships',
    count: 152,
    label: 'Requests',
    icon: Users,
    color: 'text-red-400',
    bgColor: 'bg-red-50',
  },
  {
    title: 'Reports',
    count: 152,
    label: 'Requests',
    icon: BarChart3,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Active Users',
    count: 324,
    label: 'Users',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Pending Tickets',
    count: 89,
    label: 'Tickets',
    icon: Ticket,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Chat Response',
    count: 245,
    label: 'Messages',
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Monthly Reports',
    count: 12,
    label: 'Reports',
    icon: BarChart3,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

interface TicketData {
  _id: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  topic: string;
  status: 'active' | 'awaiting' | 'resolved' | 'closed' | 'escalated';
  createdAt: string;
  updatedAt: string;
  userProfilePicture?: string | null;
}

export default function SupportCenter() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<TicketData | null>(null);

  // Fetch tickets from API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact-support/fetch-all-tickets');
      const data = await response.json();
      if (data.success) {
        setTickets(data.data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.userFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  // Format time function
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      awaiting: { bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-500' },
      active: { bg: 'bg-green-100', text: 'text-green-600', dot: 'bg-green-500' },
      resolved: { bg: 'bg-blue-100', text: 'text-blue-600', dot: 'bg-blue-500' },
      escalated: { bg: 'bg-purple-100', text: 'text-purple-600', dot: 'bg-purple-500' },
      closed: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-500' },
    };
    return statusStyles[status as keyof typeof statusStyles] || statusStyles.active;
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth ?? 0;
    const gap = 16; // This should match the gap in your flex container
    const scrollAmount = cardWidth + gap;

    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll state
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]); // Added handleScroll to dependencies

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="bg-[#f6f4fd] rounded-3xl py-8 px-5">
      <h1 className="mb-7 text-[45px] font-semibold text-[#685aad] ml-5">
        Students/Parents Support Center
      </h1>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 z-10 flex items-center ">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-sm ${!canScrollLeft ? 'bg-[#f3effc]' : 'bg-[#ede8fa]'}    min-w-[34px] min-h-[72px] `}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <ChevronLeft
              className={` w-6 ${!canScrollLeft ? 'text-[#beb6dd]' : 'text-[#685aad]'}  `}
            />
          </Button>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-hidden  mx-12 min-h-[135px] mb-2"
          onScroll={handleScroll}
        >
          {supportCards.map(card => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className=" flex-shrink-0  rounded-[11.55px] min-w-[312px] max-h-[134px]"
              >
                <CardContent className="flex flex-col gap-4 ">
                  <div className={`${card.bgColor} w-fit rounded-lg p-2`}></div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-700">{card.title}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-semibold">{card.count}</span>
                      <span className="text-gray-500">{card.label}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="absolute inset-y-0 right-0 z-10 flex items-center ">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-sm ${!canScrollRight ? 'bg-[#f3effc]' : 'bg-[#ede8fa]'}    min-w-[34px] min-h-[72px] `}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <ChevronRight
              className={` w-6 ${!canScrollRight ? 'text-[#beb6dd]' : 'text-[#685aad]'}  `}
            />
          </Button>
        </div>
      </div>

      {isChatOpen && (
        <Chat activeTicket={activeTicket} tickects={filteredTickets} name={'Test'} img={null} />
      )}

      {!isChatOpen && (
        <div className="mt-10">
          {/* Support Chats Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-[#685aad] text-2xl font-semibold">Support Chats</h2>
              <span className="bg-[#685aad] text-white px-3 py-1 rounded-full text-sm font-medium">
                {filteredTickets.length}
              </span>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, ID, date or status"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-[#685aad] focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#685aad] focus:border-transparent"
              >
                <option value="all">Sort by</option>
                <option value="awaiting">Awaiting</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="escalated">Escalated</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-sm font-medium text-gray-600">
              <div className="col-span-3">Student</div>
              <div className="col-span-2">Topic</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Last Update</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1"></div>
            </div>

            {/* Tickets List */}
            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading tickets...</div>
              ) : filteredTickets.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No tickets found</div>
              ) : (
                filteredTickets.map(ticket => {
                  const statusBadge = getStatusBadge(ticket.status);
                  return (
                    <div
                      key={ticket._id}
                      className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setIsChatOpen(true);
                        setActiveTicket(ticket);
                      }}
                    >
                      <div className="col-span-3 flex items-center gap-3">
                        {/* <div className="w-10 h-10 rounded-full bg-[#685aad] flex items-center justify-center text-white font-medium">
                        {ticket.userProfilePicture ? (
                          <Image
                            src={ticket.userProfilePicture}
                            alt={`${ticket.userFirstName} ${ticket.userLastName}`}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          `${ticket.userFirstName.charAt(0)}${ticket.userLastName.charAt(0)}`
                        )}
                      </div> */}
                        <div>
                          <div className="font-medium text-gray-900">
                            {ticket.userFirstName} {ticket.userLastName}
                          </div>
                          <div className="text-sm text-gray-500">#{ticket._id.slice(-6)}</div>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center">
                        <span className="text-gray-900 truncate">{ticket.topic}</span>
                      </div>

                      <div className="col-span-2 flex items-center">
                        <div>
                          <div className="text-gray-900">{formatDate(ticket.createdAt)}</div>
                          <div className="text-sm text-gray-500">
                            {formatTime(ticket.createdAt)}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center">
                        <div>
                          <div className="text-gray-900">{formatTime(ticket.updatedAt)}</div>
                          <div className="text-sm text-gray-500">
                            {formatTime(ticket.updatedAt)}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}
                        >
                          <div className={`w-2 h-2 rounded-full ${statusBadge.dot}`}></div>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </div>
                      </div>

                      <div className="col-span-1 flex items-center justify-center">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MessageSquare className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
