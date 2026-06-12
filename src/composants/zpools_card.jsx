import { useState } from "react";

function getRaidLabel(type) {
  if (!type) return "Inconnu";

  if (type.startsWith("mirror")) return "RAID1 / Mirror";
  if (type.startsWith("raidz1")) return "RAIDZ1";
  if (type.startsWith("raidz2")) return "RAIDZ2";
  if (type.startsWith("raidz3")) return "RAIDZ3";
  if (type.startsWith("draid")) return "dRAID";
  if (type === "single") return "Disque seul";

  return type;
}

function ZpoolCard({ pool, details }) {
  const [open, setOpen] = useState(false);

  const isHealthy = pool.health === "ONLINE";

  const hasErrors =
    details?.read_errors > 0 ||
    details?.write_errors > 0 ||
    details?.checksum_errors > 0;

  return (
    <>
      <div className="zpool-card" onClick={() => setOpen(true)}>
        <div className="zpool-card-header">
          <div>
            <h3>{pool.name}</h3>
            <p>Pool ZFS</p>
          </div>

          <span className={`zpool-status ${isHealthy ? "online" : "error"}`}>
            {pool.health}
          </span>
        </div>

        <div className="zpool-card-content">
          <p><strong>Taille :</strong> {pool.size}B</p>
          <p><strong>Utilisé :</strong> {pool.allocated}B</p>
          <p><strong>Libre :</strong> {pool.free}B</p>
          <p><strong>Utilisation :</strong> {pool.capacity}</p>
          <p><strong>Fragmentation :</strong> {pool.fragmentation}</p>
          <p><strong>Dedup :</strong> {pool.dedup}</p>
        </div>

        {details && (
          <div className="zpool-details">
            <div className="zpool-details-grid">
              <div>
                <span>Disques</span>
                <strong>{details.disk_count}</strong>
              </div>

              <div>
                <span>Vdevs</span>
                <strong>{details.vdev_count}</strong>
              </div>

              <div>
                <span>Erreurs</span>
                <strong className={hasErrors ? "zpool-error-text" : "zpool-ok-text"}>
                  {hasErrors ? "Oui" : "Non"}
                </strong>
              </div>
            </div>

            <div className="zpool-scrub">
              <span>Dernier scan</span>
              <p>{details.scrub}</p>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="zpool-modal-overlay" onClick={() => setOpen(false)}>
          <div className="zpool-modal" onClick={(e) => e.stopPropagation()}>
            <div className="zpool-modal-header">
              <div>
                <h2>{pool.name}</h2>
                <p>Détails des VDEVs et disques</p>
              </div>

              <button onClick={() => setOpen(false)}>×</button>
            </div>

            <div className="zpool-modal-content">
              {details?.vdevs?.length > 0 ? (
                details.vdevs.map((vdev, index) => (
                  <div key={index} className="zpool-vdev-box">
                    <div className="zpool-vdev-header">
                      <div>
                        <h4>{getRaidLabel(vdev.type)}</h4>
                        <span className="zpool-vdev-type">
                          {vdev.type}
                        </span>
                      </div>

                      <span className={`zpool-status ${vdev.state === "ONLINE" ? "online" : "error"}`}>
                        {vdev.state}
                      </span>
                    </div>

                    <div className="zpool-disk-list">
                      {vdev.disks.map((disk) => (
                        <div key={disk.name} className="zpool-disk-line">
                          <div>
                            <strong>{disk.name}</strong>
                            <span>{disk.state}</span>
                          </div>

                          <div className="zpool-disk-errors">
                            <span>READ {disk.read}</span>
                            <span>WRITE {disk.write}</span>
                            <span>CKSUM {disk.checksum}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="zpool-empty-details">
                  Aucun détail VDEV disponible pour ce pool.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ZpoolCard;