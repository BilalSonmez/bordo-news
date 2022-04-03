import SimpleSchema from 'simpl-schema';

LikeSchema = new SimpleSchema({
  userId: SimpleSchema.RegEx.Id,
  status: Boolean
});

CommunitySchema = new SimpleSchema({
  views: {
    type: Number,
    defaultValue: 0
  },
  like: {
    type: Array
  },
  "like.$": LikeSchema
});