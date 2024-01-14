"use strict";

const Collection = require("../util/Collection");
const GuildChannel = require("./GuildChannel");
const Message = require("./Message");

/**
 * Represents a guild text channel. See GuildChannel for more properties and methods.
 * @extends GuildChannel
 * @prop {Number} defaultAutoArchiveDuration The default duration of newly created threads in minutes to automatically archive the thread after inactivity (60, 1440, 4320, 10080)
 * @prop {Number} defaultForumLayout The default layout of the forum channel (0 = NOT_SET, 1 = LIST_VIEW, 2 = GALLERY_VIEW)
 * @prop {PartialEmoji} defaultReactionEmoji The default emoji to use for reactions
 * @prop {Number} defaultSortOrder The default sort order of the forum channel (0 = LATEST_ACTIVITY, 1 = CREATION_DATE)
 * @prop {ForumTag[]} availableTags The available tags for the forum channel
 * @prop {Number} rateLimitPerUser The ratelimit of the channel, in seconds. 0 means no ratelimit is enabled
 * @prop {String} topic The topic of the channel
 */
class ForumChannel extends GuildChannel {
  constructor(data, client, messageLimit) {
    super(data, client);
    this.messages = new Collection(Message, messageLimit == null ? client.options.messageLimit : messageLimit);
    this.lastMessageID = data.last_message_id || null;
    this.rateLimitPerUser = data.rate_limit_per_user == null ? null : data.rate_limit_per_user;
    this.update(data);
  }

  update(data) {
    super.update(data);
    if (data.default_auto_archive_duration !== undefined) {
      this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    }
    if (data.default_forum_layout !== undefined) {
      this.defaultForumLayout = data.default_forum_layout;
    }
    if (data.default_reaction_emoji !== undefined) {
      this.defaultReactionEmoji = data.default_reaction_emoji;
    }
    if (data.default_sort_order !== undefined) {
      this.defaultSortOrder = data.default_sort_order;
    }
    if (data.available_tags !== undefined) {
      this.availableTags = data.available_tags;
    }
    if (data.topic !== undefined) {
      this.topic = data.topic;
    }
  }

}

module.exports = ForumChannel;