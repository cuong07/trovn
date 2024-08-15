-- public."AdvertisingPackage" definition

-- Drop table

-- DROP TABLE public."AdvertisingPackage";

CREATE TABLE public."AdvertisingPackage" (
	id STRING NOT NULL,
	name STRING NOT NULL,
	description STRING NULL,
	duration INT4 NOT NULL,
	price FLOAT8 NOT NULL,
	CONSTRAINT "AdvertisingPackage_pkey" PRIMARY KEY (id)
);


-- public."Amenity" definition

-- Drop table

-- DROP TABLE public."Amenity";

CREATE TABLE public."Amenity" (
	id STRING NOT NULL,
	name STRING NOT NULL,
	description STRING NOT NULL DEFAULT '',
	"iconUrl" STRING NOT NULL,
	CONSTRAINT "Amenity_pkey" PRIMARY KEY (id)
);


-- public."Location" definition

-- Drop table

-- DROP TABLE public."Location";

CREATE TABLE public."Location" (
	id STRING NOT NULL,
	name STRING NOT NULL,
	country STRING NOT NULL,
	city STRING NOT NULL,
	latitude FLOAT8 NOT NULL,
	longitude FLOAT8 NOT NULL,
	CONSTRAINT "Location_pkey" PRIMARY KEY (id)
);


-- public."Tag" definition

-- Drop table

-- DROP TABLE public."Tag";

CREATE TABLE public."Tag" (
	id STRING NOT NULL,
	name STRING NOT NULL,
	description STRING NOT NULL DEFAULT '',
	CONSTRAINT "Tag_pkey" PRIMARY KEY (id),
	UNIQUE INDEX "Tag_name_key" (name),
	INDEX "Tag_name_idx" (name)
);


-- public."User" definition

-- Drop table

-- DROP TABLE public."User";

CREATE TABLE public."User" (
	id STRING NOT NULL,
	username STRING NOT NULL,
	email STRING NOT NULL,
	"phoneNumber" STRING NOT NULL DEFAULT '',
	password STRING NOT NULL,
	"avatarUrl" STRING NOT NULL DEFAULT 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
	address STRING NOT NULL DEFAULT '',
	"role" trovn.public."Role" NOT NULL DEFAULT 'USER':::trovn.public."Role",
	"isPremium" BOOL NOT NULL DEFAULT false,
	latitude FLOAT8 NULL,
	"isVerify" BOOL NOT NULL DEFAULT false,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	"advertisingPackageId" STRING NULL,
	"fullName" STRING NOT NULL DEFAULT '',
	"googleAccountId" STRING NOT NULL DEFAULT '',
	longitude FLOAT8 NULL,
	description STRING NOT NULL DEFAULT '',
	"isLooked" BOOL NOT NULL DEFAULT false,
	"violationCount" INT4 NOT NULL DEFAULT 0:::INT8,
	CONSTRAINT "User_pkey" PRIMARY KEY (id),
	CONSTRAINT "User_advertisingPackageId_fkey" FOREIGN KEY ("advertisingPackageId") REFERENCES public."AdvertisingPackage"(id) ON DELETE SET NULL ON UPDATE CASCADE,
	UNIQUE INDEX "User_username_key" (username),
	UNIQUE INDEX "User_email_key" (email),
	INDEX "User_email_phoneNumber_idx" (email ASC, "phoneNumber")
);


-- public."UserOtp" definition

-- Drop table

-- DROP TABLE public."UserOtp";

CREATE TABLE public."UserOtp" (
	id STRING NOT NULL,
	otp STRING NULL,
	"isActive" BOOL NOT NULL DEFAULT true,
	"userId" STRING NOT NULL,
	CONSTRAINT "UserOtp_pkey" PRIMARY KEY (id),
	CONSTRAINT "UserOtp_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Banner" definition

-- Drop table

-- DROP TABLE public."Banner";

CREATE TABLE public."Banner" (
	id STRING NOT NULL,
	"imageUrl" STRING NOT NULL,
	title STRING NOT NULL,
	description STRING NOT NULL,
	"fromDate" TIMESTAMP(3) NOT NULL,
	"toDate" TIMESTAMP(3) NOT NULL,
	"isAvailable" BOOL NOT NULL DEFAULT true,
	"isActive" BOOL NOT NULL DEFAULT true,
	"userId" STRING NOT NULL,
	CONSTRAINT "Banner_pkey" PRIMARY KEY (id),
	CONSTRAINT "Banner_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Conversation" definition

-- Drop table

-- DROP TABLE public."Conversation";

CREATE TABLE public."Conversation" (
	id STRING NOT NULL,
	"userOneId" STRING NOT NULL,
	"userTwoId" STRING NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
	CONSTRAINT "Conversation_pkey" PRIMARY KEY (id),
	CONSTRAINT "Conversation_userOneId_fkey" FOREIGN KEY ("userOneId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "Conversation_userTwoId_fkey" FOREIGN KEY ("userTwoId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	INDEX "Conversation_userTwoId_idx" ("userTwoId")
);


-- public."Listing" definition

-- Drop table

-- DROP TABLE public."Listing";

CREATE TABLE public."Listing" (
	id STRING NOT NULL,
	title STRING NOT NULL,
	description STRING NOT NULL,
	address STRING NOT NULL,
	latitude FLOAT8 NOT NULL,
	longitude FLOAT8 NOT NULL,
	price DECIMAL(65,30) NOT NULL,
	area DECIMAL(65,30) NOT NULL,
	term trovn.public."TermType" NOT NULL DEFAULT 'BOTH':::trovn.public."TermType",
	"isPublish" BOOL NOT NULL DEFAULT false,
	"userId" STRING NOT NULL,
	"locationId" STRING NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Listing_pkey" PRIMARY KEY (id),
	CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "Listing_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	INDEX "Listing_userId_latitude_longitude_idx" ("userId" ASC, latitude ASC, longitude)
);


-- public."ListingAmenity" definition

-- Drop table

-- DROP TABLE public."ListingAmenity";

CREATE TABLE public."ListingAmenity" (
	id STRING NOT NULL,
	"listingId" STRING NOT NULL,
	"amenityId" STRING NOT NULL,
	CONSTRAINT "ListingAmenity_pkey" PRIMARY KEY (id),
	CONSTRAINT "ListingAmenity_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES public."Listing"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "ListingAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES public."Amenity"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."ListingTag" definition

-- Drop table

-- DROP TABLE public."ListingTag";

CREATE TABLE public."ListingTag" (
	id STRING NOT NULL,
	"listingId" STRING NOT NULL,
	"tagId" STRING NOT NULL,
	CONSTRAINT "ListingTag_pkey" PRIMARY KEY (id),
	CONSTRAINT "ListingTag_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES public."Listing"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "ListingTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tag"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Message" definition

-- Drop table

-- DROP TABLE public."Message";

CREATE TABLE public."Message" (
	id STRING NOT NULL,
	content STRING NOT NULL,
	"userId" STRING NOT NULL,
	"conversationId" STRING NOT NULL,
	deleted BOOL NOT NULL DEFAULT false,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	"isSeen" BOOL NOT NULL DEFAULT false,
	CONSTRAINT "Message_pkey" PRIMARY KEY (id),
	CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public."Conversation"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	INDEX "Message_userId_idx" ("userId"),
	INDEX "Message_conversationId_idx" ("conversationId")
);


-- public."Payment" definition

-- Drop table

-- DROP TABLE public."Payment";

CREATE TABLE public."Payment" (
	id STRING NOT NULL,
	amount FLOAT8 NULL,
	status BOOL NOT NULL,
	provider STRING NULL,
	note STRING NULL DEFAULT '',
	"transactionId" STRING NOT NULL,
	"isActive" BOOL NOT NULL DEFAULT true,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	"userId" STRING NOT NULL,
	CONSTRAINT "Payment_pkey" PRIMARY KEY (id),
	CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	UNIQUE INDEX "Payment_transactionId_key" ("transactionId"),
	INDEX "Payment_transactionId_idx" ("transactionId")
);


-- public."Report" definition

-- Drop table

-- DROP TABLE public."Report";

CREATE TABLE public."Report" (
	id STRING NOT NULL,
	content STRING NOT NULL,
	"reporterId" STRING NOT NULL,
	"reportedId" STRING NOT NULL,
	"isActive" BOOL NOT NULL DEFAULT true,
	"isProcess" BOOL NOT NULL DEFAULT false,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Report_pkey" PRIMARY KEY (id),
	CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "Report_reportedId_fkey" FOREIGN KEY ("reportedId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	INDEX "Report_reporterId_reportedId_idx" ("reporterId" ASC, "reportedId")
);


-- public."Review" definition

-- Drop table

-- DROP TABLE public."Review";

CREATE TABLE public."Review" (
	id STRING NOT NULL,
	rating INT4 NOT NULL,
	content STRING NOT NULL DEFAULT '',
	"userId" STRING NOT NULL,
	"listingId" STRING NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Review_pkey" PRIMARY KEY (id),
	CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "Review_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES public."Listing"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	INDEX "Review_userId_listingId_idx" ("userId" ASC, "listingId")
);


-- public."Favorite" definition

-- Drop table

-- DROP TABLE public."Favorite";

CREATE TABLE public."Favorite" (
	id STRING NOT NULL,
	"userId" STRING NOT NULL,
	"listingId" STRING NOT NULL,
	CONSTRAINT "Favorite_pkey" PRIMARY KEY (id),
	CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "Favorite_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES public."Listing"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."Image" definition

-- Drop table

-- DROP TABLE public."Image";

CREATE TABLE public."Image" (
	id STRING NOT NULL,
	url STRING NOT NULL,
	caption STRING NOT NULL DEFAULT '',
	"listingId" STRING NOT NULL,
	CONSTRAINT "Image_pkey" PRIMARY KEY (id),
	CONSTRAINT "Image_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES public."Listing"(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public."OrderItem" definition

-- Drop table

-- DROP TABLE public."OrderItem";

CREATE TABLE public."OrderItem" (
	id STRING NOT NULL,
	amount FLOAT8 NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	"paymentId" STRING NOT NULL,
	"userId" STRING NOT NULL,
	"advertisingPackageId" STRING NULL,
	CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id),
	CONSTRAINT "OrderItem_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES public."Payment"(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT "OrderItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "OrderItem_advertisingPackageId_fkey" FOREIGN KEY ("advertisingPackageId") REFERENCES public."AdvertisingPackage"(id) ON DELETE CASCADE ON UPDATE CASCADE
);