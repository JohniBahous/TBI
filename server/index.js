import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { PrismaClient } from '@prisma/client';
import { getFileUrlFromS3, getUploadUrl, moveObject } from './s3/awsS3connect.js'


const app = express();


const PORT = "8080"
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(cors({
  origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

// app.use('/presignedurl',limiter);

// const speedLimiter = slowDown({
//   windowMs: 15 * 60 * 1000,
//   delayAfter: 100,
//   delayMs: () => 2000,
// });

// app.use(speedLimiter);

app.use(cookieParser());

app.use(express.json());


const prisma = new PrismaClient();


export function requireAdmin(req, res, next) {
  const token = req.cookies?.admin_token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.admin = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}


app.get('/uuids', async (req, res) => {

    const artists = await prisma.artist.findMany({
      select: {
        uuid: true, 
        song: {
          select: {
            uuid: true, 
          },
        },
      },
    });

    res.json(artists);
  });

app.get('/artists', async (req, res) => {
  const artists = await prisma.artist.findMany(
    {
      where: { 
        isActive: true,
        isArchived: false
      }
    }
  );
  res.json(artists);
});

app.get('/artists/:uuid', async (req, res) => {
  const {uuid} = req.params;  
  const artist = await prisma.artist.findUnique({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false
        }
    }
  );
  res.json(artist);
});

app.get('/artists/:uuid/song', async (req, res) => {
  const {uuid} = req.params;  
  const song = await prisma.song.findUnique({
        where:{
          artistUuid: uuid,
          isActive: true,
          isArchived: false 
        }
    }
  );
  res.json(song);
});


app.get('/songs', async (req, res) => {
  const songs = await prisma.song.findMany({
        where:{
          isActive: true,
          isArchived: false 
        }
    }
  );
  res.json(songs);
});

app.get('/songs/:uuid', async (req, res) => {
  const {uuid} = req.params;  
  const song = await prisma.song.findUnique({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false 
        }
    }
  );
  res.json(song);
});

app.get(`/songs/:type/:uuid`, async (req, res) => {
  const {type, uuid} = req.params;  
  const song = await prisma.song.findUnique({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false 
        }
    }
  );
  const signedUrl = await getFileUrlFromS3(song.s3Key, type, 600)
  res.json({url:signedUrl});
});

app.get(`/artists/:type/:uuid`, async (req, res) => {
  const {type, uuid} = req.params;  
  const artist = await prisma.artist.findUnique({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false 
        }
    }
  );
  const signedUrl = await getFileUrlFromS3(artist.s3Key, type, 600)
  res.json({url:signedUrl});
});

app.put(`/songs/:uuid/full/plays`, requireAdmin, async (req,res) => {
  const  {uuid} = req.params;  
  const song = await prisma.song.update({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false 
        },
        data: {
          songPlays: { increment: 1 }
        }
    }
  );
    res.json(song)
});

app.put(`/songs/:uuid/snippet/plays`, async (req,res) => {
  const  {uuid} = req.params;  
  const song = await prisma.song.update({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false 
        },
        data: {
          snippetPlays: { increment: 1 }
        }
    }
  );
    res.json(song)
});

 app.put(`/songs/:uuid/update`, requireAdmin, async (req, res) => {
  const {uuid} = req.params;
  const updatedSong = await prisma.song.update({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false 
        },
    data: req.body
  }
)
  res.json(updatedSong)

})

 app.put(`/artists/:uuid/update`, requireAdmin, async (req, res) => {
  const {uuid} = req.params;
  const updatedArtist = await prisma.artist.update({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false 
        },
    data: req.body
  }
)
  res.json(updatedArtist)

})

app.post('/presignedurl', requireAdmin, async (req, res) => { 
  const { folderName, fileName, fileType } = req.body
  const signedUrl = await getUploadUrl( folderName, fileName, fileType, 600);
  if(signedUrl) res.json({url:signedUrl});;
} )

app.get('/artists/:uuid/filename', async (req, res) => {
  const {uuid} = req.params;  
  const artist = await prisma.song.findUnique({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false 
        },
        select: { s3Key: true }
    }
  );
  res.json(artist);
});

app.get('/songs/:uuid/filename', async (req, res) => {
  const {uuid} = req.params;  
  const song = await prisma.song.findUnique({
        where: { 
          uuid: uuid,
          isActive: true,
          isArchived: false 
        },
        select: { s3Key: true }
    }
  );
  res.json(song);
});

app.put('/:uuid/replace', requireAdmin, async (req,res) => {
  const {uuid} = req.params;
  const {newData} = req.body;

  const artist = await prisma.artist.findUnique({
    where: { uuid },
  });

  const song = await prisma.song.findUnique({ 
    where: { artistUuid: uuid } 
  });
  
  await prisma.artist.update({
    where: { uuid: uuid },
    data: { isArchived: true, isActive: false }
  })

  await prisma.song.update({
    where: { artistUuid: uuid },
    data: { isArchived: true, isActive: false }
  })

  await moveObject("full",newData.filesData.full, song.s3Key)
  await moveObject("snippet",newData.filesData.snippet, song.s3Key)
  await moveObject("portrait",newData.filesData.portrait, artist.s3Key)

  const replacedSong = await prisma.song.create ({
    data: { ...newData.songData }
  })

   const replacedArtist = await prisma.artist.create ({
    data: { ...newData.artistData }
  })

  return res.json({replacedArtist, replacedSong})
})

app.get('/admin/all', async (req,res) => {
    const admins = await prisma.admin.findMany({

    }
  );
  res.json(admins);
})

app.get('/admin/:uuid', async(req,res) => {
  const {uuid} = req.params;
  const admin = await prisma.admin.findUnique({
    where: {
      uuid: uuid,
    }
  })
  res.json(admin);
})

app.put('/admin/:uuid/login', async (req, res) => {
  try {
    const { uuid } = req.params;
    const { password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { uuid }
    });

    // admin not found
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    // password check
    const isMatched = await bcrypt.compare(password, admin.hashedPassword);

    if (!isMatched) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // generate token
    const token = jwt.sign(
      { adminId: admin.uuid },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    // send cookie
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: false, // true in production HTTPS
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    return res.json({
      success: true,
      admin: { uuid: admin.uuid, name: admin.name }
    });

  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/admin/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ message: "Logged out" });
});

app.get("/admin/me", requireAdmin, async (req, res) => {
  const admin = await prisma.admin.findUnique({ where: { uuid: req.admin.adminId }});
  res.json({ authenticated: true, admin });
});

app.post('/admin/audit', requireAdmin, async(req,res) => {
  const {uuid, name, action} = req.body

  await prisma.audit.create({
    data:{
      adminUuid: uuid,
      adminName: name,
      action: action,
    }
  })
  res.json({ message: 'Audit updated successfully' });
})


app.use((req, res, next) => {
  res.status(404).send('NOT QUITE WHAT YOU WERE LOOKING FOR')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('PARDON OUR DUST')
})

app.disable('x-powered-by')