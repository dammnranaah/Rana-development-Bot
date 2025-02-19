module.exports = {
    "token": "MTM0MTA1NTY5MDc5MzQxODg2NA.GbvjoB.CKZ8xFXABUQMRbS9oDBqWJqUH7DH7SUefqVowc",
    "guildId": "1339361200479404042",
    "owners": ["1139532286358978560"],
    "ticket": {
        "prefix": "!",
        "prefixCommands": [
            {
                "command": "other", // Command name
                "reply": "[ticketOwner] if you don't have any other questions or issues, you can close the ticket using the button below.", // Reply [ticketOwner], [assignedStaff], [categoryName]
                "onlyTicket": true, // Can the command only be used in ticket channels?
                "onlyStaff": true, // Can the command only be used by staff?
                "instaDelete": true, // Should the command be deleted immediately after being used?
                "button": {
                    "id": "TicketCloseButton",
                    "name": "Close Ticket",
                    "emoji": "🔒",
                    "type": 2
                }
            }
        ],
        "type": "button", // Button or Menu or Modal
        "otherLanguage": "en-US", // Specify which language to show if a translation is missing for a message
        "staffRankingSystem": {
            "status": true,
            "dailyRanking": true,
            "weeklyRanking": true,
            "monthlyRanking": true,
        },
        "mentionCategoryStaffsWhenTicketOpened": {
            "status": true, // Should @everyone be sent to the channel after ticket is opened?
            "deleteAfterMention": false, // Should @everyone be deleted after mention?
        },
        "mentionOwnerWhenTicketReopened": {
            "status": false, // Should the ticket owner be mentioned when ticket is reopened?
        },
        "onlyStaffCanCloseTickets": {
            "status": true, // Only staff can close tickets (Set true if you want only staff to close tickets, false if anyone in the ticket can close it)
            "embed": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "Only staff members can close tickets. Please ask them to close your support request.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "Tickets can only closed by the staffs. You need to ask them to close your support request.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            }
        },
        //
        "sendRateMessageToUserAfterTicketClosed": {
            "status": true,
            "sendTranscript": true,
            "button": {
                "id": "TicketRatingButton",
                "name": "⭐",
                "type": 2,
            },
            "embed": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "Hello, your ticket has been closed. Could you please rate your experience to help us improve?\n\nStaff who assisted you: [staff]",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "Hello, your ticket has been closed, can you rate your experience in the request so that we can improve ourselves?\n\nStaff who was take care of your ticket: [staff]",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
            "afterRatingEmbed": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "Thank you for your rating.\n\nRating given: [rating]",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "Thank you for your review.\n\nRating given: [rating]",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
        },
        //
        "askHowDidYouHearUs": {
            "status": true,
            "answerLogChannelId": "1193554967018078219",
            "customId": "HowDidYouHearModal",
            "inputCustomId": "SurveyQuestion",
            "embed": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "Thank you for your answer. You can create a new ticket by clicking the button again.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "Thank you for your answer. You can create ticket by repressing the button.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
            "tr": {
                "title": "Survey",
                "input": [
                    {
                        "label": "How Did You Hear About Us?",
                        "type": "paragraph",
                        "minLength": 1,
                        "maxLength": 500,
                        "required": true,
                    }
                ]
            },
            "en-US": {
                "title": "Survey",
                "input": [
                    {
                        "label": "How Did You Hear Us?",
                        "type": "paragraph",
                        "minLength": 1,
                        "maxLength": 500,
                        "required": true,
                    }
                ]
            },
        },
        //
        "transcript": {
            "status": true, // Enable or disable transcript
            "saveImages": true, // Save images in transcript? (INCREASES FILE SIZE!)
            "transcriptFolder": "transcripts", // Which folder to save transcripts in? Set to false if you don't want to save
            "transcriptLogChannelId": "1256050606011977841", // Which channel to send transcripts to
        },
        //
        "ticketOpenerButton": {
            "id": "TicketButton",
            "name": "",
            "emoji": "📥",
            "type": 1
        },
        //
        "ticketCategorySelecterMenu": {
            "customId": "TicketMenuRow",
            "placeholder": {
                "tr": "Please select a category",
                "en-US": "Please choose a category",
            },
        },
        "ticketCategorySelectionComponents": {
            "button": {
                "id": "TicketCategoryButton"
            },
            "menu": {
                "id": "TicketCategoryMenu"
            }
        },
        "closeTicket": {
            "button": {
                "id": "TicketCloseButton",
                "tr": {
                    "name": "Close Ticket",
                    "emoji": "🔒",
                    "type": 2
                },
                "en-US": {
                    "name": "Close Ticket",
                    "emoji": "🔒",
                    "type": 2
                },
            }
        },
        "ticketAssignment": {
            "status": true,
            "button": {
                "id": "TicketAssignButton",
                "tr": {
                    "name": "Assign Ticket",
                    "emoji": "🙌",
                    "type": 1
                },
                "en-US": {
                    "name": "Assign Ticket",
                    "emoji": "🙌",
                    "type": 1
                },
            }
        },
        "ticketDelete": {
            "button": {
                "id": "TicketDeleteButton",
                "tr": {
                    "name": "Delete Ticket",
                    "emoji": "🗑️",
                    "type": 4
                },
                "en-US": {
                    "name": "Delete Ticket",
                    "emoji": "🗑️",
                    "type": 4
                },
            }
        },
        "ticketReopen": {
            "button": {
                "id": "TicketReopenButton",
                "tr": {
                    "name": "Reopen Ticket",
                    "emoji": "🔁",
                    "type": 2
                },
                "en-US": {
                    "name": "Reopen Ticket",
                    "emoji": "🔁",
                    "type": 2
                },
            }
        },
        "ticketBlacklist": {
            "status": "update", // reply or update
            "embed": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "You cannot open a ticket, you are blacklisted!",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "You cannot create a ticket, you are blacklisted!",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            }
        },
        "categories": [
            {
                "tr": {
                    "name": "Pre-Sales Support",
                    "emoji": "❔",
                    "description": "You can get answers to your questions by opening pre-sales support.",
                    "channelName": "pre-sales",
                    "requiredRoleId": [],
                    "staffRoleId": ["929140726988685422"],
                    "buttonType": 1,
                    "questions": [
                        { "label": "Your Name", "type": "short", "minLength": 1, "maxLength": 32, "required": true },
                        { "label": "State Your Question", "type": "paragraph", "minLength": 1, "maxLength": 500, "required": true },
                    ],
                    "parentCategoryId": "1256050676514164786"
                },
                "en-US": {
                    "name": "Pre Sales Support",
                    "emoji": "❔",
                    "description": "You can remove your questions by opening pre sales support.",
                    "channelName": "pre-sales",
                    "requiredRoleId": [],
                    "staffRoleId": ["929140726988685422"],
                    "buttonType": 1,
                    "questions": [
                        { "label": "Your Name", "type": "short", "minLength": 1, "maxLength": 32, "required": true },
                        { "label": "Describe Your Question", "type": "paragraph", "minLength": 1, "maxLength": 500, "required": true },
                    ],
                    "parentCategoryId": "1256050676514164786"
                },
            },
            {
                "tr": {
                    "name": "Customer Support",
                    "emoji": "⭐",
                    "description": "You can get help by opening customer support.",
                    "channelName": "customer",
                    "requiredRoleId": ["1079421720890449920"],
                    "staffRoleId": ["929140726988685422"],
                    "buttonType": 1,
                    "questions": [],
                    "parentCategoryId": "1256050676514164786"
                },
                "en-US": {
                    "name": "Customer Support",
                    "emoji": "⭐",
                    "description": "You can get help by opening customer support.",
                    "channelName": "customer",
                    "requiredRoleId": ["1079421720890449920"],
                    "staffRoleId": ["929140726988685422"],
                    "buttonType": 1,
                    "questions": [],
                    "parentCategoryId": "1256050676514164786"
                },
            },
        ],
        "messages": {
            "dontHavePerm": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "You don't have sufficient permissions to do this.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "You don't have permission to do that.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
            "setupEmbed": {
                "tr": {
                    "title": "How to open a support ticket?",
                    "description": "Click the '📥' button below and select the category you need support from. After specifying why you want to open a ticket in the form that appears, a private support ticket channel will be created for you. You can ask questions and place orders through the support ticket.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "How can I open ticket?",
                    "description": "By clicking the '📥' button below, select the category you want to get support from from the menu that appears. Then, after you specify why you want to open a request in the form that appears, a special ticket channel will be opened for you. You can ask questions and place orders via the ticket.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
            "selectionEmbed": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "Select a category below.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "Choose a category down there.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
            "doesNotHaveRequiredRole": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "You need to have [roles] role to open a ticket in this category.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "You need to have [roles] role to open ticket at that category.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
            "ticketAlreadyExists": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "You already have an active ticket named [channel].",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "You already have an active support request called [channel].",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
            "ticketOpened": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "Your ticket has been opened! [channel]",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "Your ticket has been opened! [channel]",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
            "newTicketChannel": {
                "createdBy": {
                    "status": true,
                    "tr": "Created By",
                    "en-US": "Created By",
                },
                "category": {
                    "status": true,
                    "tr": "Support Category",
                    "en-US": "Ticket Category",
                },
                "embed": {
                    "tr": {
                        "title": "Support Ticket",
                        "description": "Hello, [user]. Welcome to your ticket!\n\nYou can contact the staff and get support through this channel. If you want to close the ticket, you can do so by clicking the Close Ticket button in the pinned message.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                    "en-US": {
                        "title": "Ticket",
                        "description": "Hello, [user]. Welcome to your ticket!\n\nYou can contact the support team and get support from this channel. If you want to close the request, you can close the request by clicking the Close Request button in the pinned message.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                }
            },
            "ticketClosed": {
                "embed": {
                    "tr": {
                        "title": "Support Ticket",
                        "description": "Ticket has been closed. Choose what to do with the ticket below.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                    "en-US": {
                        "title": "Ticket",
                        "description": "Ticket has been closed. Choose what to do with the ticket below.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                }
            },
            "ticketReopened": {
                "embed": {
                    "tr": {
                        "title": "Support Ticket",
                        "description": "Ticket has been reopened by [staff].",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                    "en-US": {
                        "title": "Ticket",
                        "description": "Ticket has been reopened by [staff].",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                }
            },
            "ticketDeleted": {
                "embed": {
                    "tr": {
                        "title": "Support Ticket",
                        "description": "Ticket was requested to be deleted. Ticket is being deleted...",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                    "en-US": {
                        "title": "Ticket",
                        "description": "Ticket was requested to be deleted. Ticket is being deleted...",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                }
            },
            "ticketOwnerLeft": {
                "embed": {
                    "tr": {
                        "title": "Support Ticket",
                        "description": "Ticket owner has left the server.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                    "en-US": {
                        "title": "Ticket",
                        "description": "Ticket owner left the guild.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                }
            },
            "ticketOwnerJoined": {
                "embed": {
                    "tr": {
                        "title": "Support Ticket",
                        "description": "Ticket owner has joined the server.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                    "en-US": {
                        "title": "Ticket",
                        "description": "Ticket owner joined the guild.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                }
            },
            "transcriptLog": {
                "ticketOwner": {
                    "status": true,
                    "content": "Ticket Owner",
                },
                "ticketAssignedStaff": {
                    "status": true,
                    "content": "Assigned Staff",
                    "undefined": "Staff Not Assigned"
                },
                "ticketCloser": {
                    "status": true,
                    "content": "Ticket Closer",
                    "undefined": "Undefined"
                },
                "ticketCategory": {
                    "status": true,
                    "content": "Ticket Category",
                },
                "ticketLocale": {
                    "status": true,
                    "content": "Ticket Locale",
                },
                "embed": {
                    "title": "A Ticket Was Closed",
                    "description": "[user]'s ticket was closed.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                }
            },
            "staffAssignedToTicket": {
                "tr": {
                    "title": "Support Ticket",
                    "description": "The ticket has been assigned to [staff]. They will assist you with this ticket.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
                "en-US": {
                    "title": "Ticket",
                    "description": "Ticket was assigned by [staff]. They will take care of you on this ticket.",
                    "color": "#bada55",
                    "image": false,
                    "footer": "Ranas Development"
                },
            },
            "blacklist": {
                "alreadyIn": {
                    "en-US": "[user] is already in blacklist.",
                    "tr": "[user] adlı üye zaten karaliste içerisinde."
                },
                "notIn": {
                    "en-US": "[user] is not in blacklist.",
                    "tr": "[user] adlı üye karalistede değil."
                },
                "successfullyAdded": {
                    "en-US": "Successfully added [user] to blacklist.",
                    "tr": "[user] adlı üye karalisteye eklendi."
                },
                "successfullyRemoved": {
                    "en-US": "Successfully removed [user] from blacklist.",
                    "tr": "[user] adlı üye karalisteden çıkarıldı."
                },
                "blacklistEmpty": {
                    "en-US": "Blacklist is empty.",
                    "tr": "Karaliste boş."
                }
            },
            "staff-ranking": {
                "rankEmoji": ["🥇", "🥈", "🥉"],
                "ranking": {
                    "tr": "[rank] [staff]\nㅤ• Helped **[ticketCount]** tickets.\nㅤ• Sent **[messageCount]** messages in tickets.\nㅤ• Average rating **[averageRating]** [ratingEmoji]",
                    "en-US": "[rank] [staff]\nㅤ• Helped **[ticketCount]** tickets.\nㅤ• Sent **[messageCount]** messages in tickets.\nㅤ• Average rating **[averageRating]** [ratingEmoji]"
                },
                "embed": {
                    "tr": {
                        "title": "Support Ticket",
                        "description": "Staff ranking is shown below.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development - Page [currentPage]/[maxPage]"
                    },
                    "en-US": {
                        "title": "Ticket",
                        "description": "Staff ranking is below.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development - Page [currentPage]/[maxPage]"
                    }
                },
                "previousButton": {
                    "id": "Previous",
                    "tr": {
                        "name": "Önceki",
                        "emoji": "⬅️",
                        "type": 1
                    },
                    "en-US": {
                        "name": "Previous",
                        "emoji": "⬅️",
                        "type": 1
                    },
                },
                "nextButton": {
                    "id": "Next",
                    "tr": {
                        "name": "Sonraki",
                        "emoji": "➡️",
                        "type": 1
                    },
                    "en-US": {
                        "name": "Next",
                        "emoji": "➡️",
                        "type": 1
                    },
                },
                "pagesDisabled": {
                    "tr": "Aradan uzun bir zaman geçtiği için sayfalar pasif hâle getirildi.",
                    "en-US": "As a long time passed, the pages became inactive."
                },
                "onlyUsableByCommandSender": {
                    "tr": {
                        "title": "Support Ticket",
                        "description": "Only the command sender can use these buttons.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                    "en-US": {
                        "title": "Ticket",
                        "description": "Only command user can use those buttons.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    }
                },
            },
            "reassign-ticket": {
                "memberDoesntHavePerm": {
                    "tr": {
                        "title": "Support Ticket",
                        "description": "The mentioned user does not have sufficient permissions.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                    "en-US": {
                        "title": "Ticket",
                        "description": "The person you mentioned does not have sufficient authority.",
                        "color": "#bada55",
                        "image": false,
                        "footer": "Ranas Development"
                    },
                }
            }
        }
    }
}